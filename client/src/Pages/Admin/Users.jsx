import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tag, message } from "antd";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import moment from "moment";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";
import { UpdateProductStatus } from "../../apicalls/product";

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllUsers(null);
      dispatch(setLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        let tagColor;

        if (record.status === "active") {
          tagColor = "success";
        } else if (record.status === "blocked") {
          tagColor = "error";
        } else {
          tagColor = "default";
        }

        return <Tag color={tagColor}>{record.status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <Popconfirm
                title="Are you sure to block this product?"
                onConfirm={() => onStatusUpdate(_id, "blocked")}
                okText="Yes"
                cancelText="No"
                okType="default"
              >
                <Button danger>Block</Button>
              </Popconfirm>
            )}
            {status === "blocked" && (
              <Button danger onClick={() => onStatusUpdate(_id, "active")}>
                Unblock
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table className="mt-4" columns={columns} dataSource={users} />
    </div>
  );
}

export default Users;