import React from "react";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import moment from "moment";
import { DeleteNotification } from "../apicalls/notifications";
import { useDispatch } from "react-redux";
import { setLoader } from "../redux/loadersSlice";

const Notifications = ({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteNotification(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={900}
    >
      <div className="flex flex-col my-4 gap-2">
        {notifications.map((notification) => (
          <div
            className="p-4 rounded-md border border-gray-200 flex flex-col gap-1 cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="font-medium text-gray-800">
                  {notification.title}
                </h1>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-gray-600 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <div>
                <RiDeleteBin6Line
                  onClick={() => {
                    deleteNotification(notification._id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default Notifications;