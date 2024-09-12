"use client";
import {
  Form,
  Input,
  Space,
  Select,
  Card,
  Image,
  InputNumber,
  Button,
  Upload,
} from "antd";
import { useRef, useState } from "react";
import { useGetAllCategoryQuery } from "@/app/redux/features/getAllCategoryApi";
import dynamic from "next/dynamic";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useAddGigMutation } from "@/app/redux/features/addGigApi";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddGig = () => {
  const { data: categoryData, isLoading, error } = useGetAllCategoryQuery({});
  const router = useRouter();
  const [setData, { isError, isLoading: loading }] = useAddGigMutation();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleAddEvent = async (values) => {
    const result = {
      ...values,
      images: fileList?.map((item) => item?.originFileObj),
      description: content,
    };
    try {
      const formData = new FormData();
      formData.append("title", result?.title);
      formData.append("description", result?.description);
      formData.append("categoriesId", result?.categoriesId);
      formData.append("price", result?.price);
      for (let i = 0; i < result?.images?.length; i++) {
        formData.append("images", result?.images[i]);
      }
      formData.append("package", JSON.stringify(result?.package));
      const response = await setData(formData).unwrap();
      if (response?.code === 201) {
        Swal.fire({
          title: "Success!",
          text: "Gig created successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/profile");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to create gig",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const transformedArray = categoryData?.results.map((item) => ({
    type: item.id,
    label: item.name,
  }));
  return (
    <div className="container">
      <div className="py-5">
        <h1 className="text-[24px] font-medium">Add Your Gig</h1>
        <p className="text-textGray">
          Complete your gig and keep it updated to help us connect you with the
          right people.
        </p>
      </div>
      <div>
        <Form
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 40 }}
          layout="vertical"
          onFinish={handleAddEvent}
          autoComplete="off"
        >
          <div className="flex gap-5">
            <Form.Item
              name="images"
              label={<span className="text-[18px]">Upload Images</span>}
              className="flex-1"
            >
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                  alt="image"
                />
              )}
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item
              name="title"
              label={<span className="text-[18px]">Gig Title</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input your Job Title!",
                },
              ]}
            >
              <Input
                placeholder="Gig Title"
                className="p-4 bg-[#F5F5F5] rounded w-full justify-start mt-[12px] items-center gap-4 inline-flex hover:bg-[#F5F5F5]"
              />
            </Form.Item>
          </div>

          <div className="flex-1 mt-[16px]">
            <Form.Item
              name="description"
              label={<span className="text-[18px]">About Gigs</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input About Gigs!",
                },
              ]}
            >
              <JoditEditor
                ref={editor}
                value={content}
                onChange={(newContent) => {
                  setContent(newContent);
                }}
                className="text-wrap"
                style={{ width: "100%", height: "400px" }}
              />
            </Form.Item>
          </div>

          <div className="flex-1">
            <Form.Item
              name="categoriesId"
              label={<span className="text-[18px]">Category</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Subscription Type!",
                },
              ]}
            >
              <Select className="bg-[#F5F5F5]">
                {transformedArray?.map((item) => (
                  <Select.Option key={item?.type} value={item?.type}>
                    {item?.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex-1 mt-[16px]">
            <Form.Item
              name="price"
              label={<span className="text-[18px]">Basic Price</span>}
              className="flex-1"
              rules={[
                {
                  required: true,
                  message: "Please input Price!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Price"
                className="p-4 bg-[#F5F5F5] rounded w-full justify-start mt-[12px] items-center gap-4 inline-flex hover:bg-[#F5F5F5]"
              />
            </Form.Item>
          </div>

          <Form.List name="package">
            {(fields, { add, remove }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Package ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input package name!",
                        },
                      ]}
                      label="Name"
                      name={[field.name, "name"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Please input package price!",
                        },
                      ]}
                      label="Price"
                      name={[field.name, "price"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Delivery Time"
                      name={[field.name, "deliveryDate"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input package delivery time!",
                        },
                        {
                          type: "number",
                          min: 1,
                          max: 180,
                          message:
                            "Delivery date must be between 1 and 180 days",
                        },
                      ]}
                    >
                      <InputNumber min={1} max={180} className="w-full" />
                    </Form.Item>

                    <Form.Item label="Features">
                      <Form.List name={[field.name, "features"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "feature"]}
                                >
                                  <Input placeholder="feature" block />
                                </Form.Item>

                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <Button
                              type="dashed"
                              onClick={() => subOpt.add()}
                              block
                            >
                              + Add Features
                            </Button>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => {
                    if (fields.length < 3) {
                      add();
                    }
                  }}
                  block
                  disabled={fields.length >= 3}
                >
                  + Add Packages
                </Button>
              </div>
            )}
          </Form.List>
          <Button
            htmlType="submit"
            block
            className="block w-[500px] h-[56px] my-[30px] px-2 py-4 text-white bg-primary hover:bg-primary active:bg-primary"
            style={{
              marginTop: "30px",
              backgroundColor: "#00BF63",
              color: "#fff",
              size: "18px",
              height: "56px",
            }}
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddGig;
