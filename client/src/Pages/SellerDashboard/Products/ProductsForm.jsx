import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tabs,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addproduct, EditProduct } from "../../../apicalls/product";
import { setLoader } from "../../../redux/loadersSlice";
import Images from "./Images";

const additionalThings = [
  {
    label: "Tax Cleared",
    name: "taxCleared",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await Addproduct(values);
      }

      dispatch(setLoader(false));
      if (response && response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false); // Close the form if the operation is successful
      } else {
        message.error(response ? response.message : "An error occurred.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    setShowProductForm(false);
  };

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={handleCancel}
      centered
      width={1000}
      footer={null}
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <h1 className="text-2xl text-center font-semibold">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <Select>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Condition" name="condition" rules={rules}>
                    <Select>
                      <option value="Brand New">Brand New</option>
                      <option value="Used-Like-New">Used-Like New</option>
                      <option value="Used-Good">Used-Good</option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        className="w-8 h-8"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldsValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
                <Form.Item
                  label="Show Product Bids"
                  name="ShowProductBids"
                  valuePropName="checked"
                >
                  <Input
                    type="checkbox"
                    className="w-8 h-8"
                    onChange={(e) => {
                      formRef.current.setFieldsValue({
                        ShowProductBids: e.target.checked,
                      });
                    }}
                    checked={formRef.current?.getFieldsValue("ShowProductBids")}
                  />
                </Form.Item>
              </div>
            </Form>
            {/* Footer buttons for the "General" tab */}
            <div className="flex justify-end gap-2">
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>
              <Button key="save" onClick={() => formRef.current.submit()}>
                Save
              </Button>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              setShowProductForm={setShowProductForm}
              getData={getData}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;