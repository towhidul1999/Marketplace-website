import React from "react";
import { Modal, Input, Select, Checkbox, Switch, Form, message } from "antd";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/constant";

const { Option } = Select;

const CustomOfferModal = ({ isOpen, gig, onClose, handleSubmitOffer }) => {
  const [form] = Form.useForm();
  const handleOnFinish = (values) => {
    handleSubmitOffer(values);
    form.resetFields();
  };
  return (
    <Modal
      title={<h1 className="text-xl font-bold">Create a Custom Offer</h1>}
      open={isOpen}
      onCancel={onClose}
      width={700}
      centered
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleOnFinish}
        initialValues={{
          expiration: `${1} Day`,
          requestRequirement: false,
        }}
        className="space-y-3 mt-4"
      >
        <h4 className="text-xl font-medium">{gig?.title}</h4>
        <div className="flex gap-4 items-start">
          <div className="w-72 h-40 relative">
            <Image
              src={`${imageBaseUrl}${gig?.images[0]}`}
              fill
              className="rounded absolute"
              alt="gig-image"
            />
          </div>
          <Form.Item
            name="description"
            rules={[{ required: true, message: "Please describe your offer!" }]}
            className="w-full"
          >
            <Input.TextArea rows={7} placeholder="Describe Your Offer" />
          </Form.Item>
        </div>

        <div className="flex justify-between items-center gap-4 bg-gray-100 p-4 rounded">
          <Form.Item
            name="revisionDays"
            label="Revision Days"
            className="w-full"
          >
            <Select placeholder="Select Revision Days">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="unlimited">Unlimited</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="deliveryTime"
            label="Delivery Days"
            rules={[
              { required: true, message: "Please select delivery days!" },
            ]}
            className="w-full"
          >
            <Select placeholder="Select Delivery Days">
              <Option value="1">1 Day</Option>
              <Option value="4">4 Days</Option>
              <Option value="7">7 Days</Option>
              <Option value="10">10 Days</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter a price!" }]}
            className="w-full"
          >
            <Input
              type="number"
              placeholder="Enter your price"
              min={0}
              addonBefore={<span>$</span>}
            />
          </Form.Item>
        </div>

        <div className="flex justify-between gap-4 items-center bg-gray-100 p-4 rounded">
          {/* name="offerExpiration" */}
          <Form.Item  valuePropName="checked">
            <Checkbox className="w-full">Offer Expire Time</Checkbox>
          </Form.Item>
          {/* name="expiration" */}
          <Form.Item  className="w-32">
            <Select placeholder="Select Expire Time">
              <Option value="1">1 Day</Option>
              <Option value="2">2 Days</Option>
              <Option value="3">3 Days</Option>
              <Option value="4">4 Days</Option>
            </Select>
          </Form.Item>
        </div>

        <div className="flex justify-between gap-4  py-4">
          <label className="font-semibold">Request for Requirement</label>
          <Form.Item name="requestRequirement" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-2">
          <div
            className="px-5 py-1 border border-green-500 rounded bg-white cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </div>
          <button
            className="px-5 py-1 border border-green-500 rounded bg-green-500 text-white"
            type="submit"
          >
            Submit Offer
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default CustomOfferModal;
