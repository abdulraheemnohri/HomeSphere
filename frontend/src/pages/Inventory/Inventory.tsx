import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Modal, Select, Table, Tag, message, DatePicker, Space, Typography, Form, Popconfirm, Upload, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, InboxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Search } = Input;

interface InventoryItemType {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  quantity: number;
  unit: string;
  purchase_date: string;
  purchase_price: number;
  current_value: number;
  barcode: string;
  brand: string;
  condition: string;
  status: string;
  low_stock_alert: number;
  location: string;
  warranty_expiry_date: string;
  notes: string;
  room_name: string;
}

const Inventory: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<InventoryItemType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchInventoryItems();
  }, []);

  const fetchInventoryItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/inventory/', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      if (response.ok) {
        const data = await response.json();
        setInventoryItems(data);
      }
    } catch (err) {
      message.error('Failed to fetch inventory items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (values: any) => {
    try {
      const response = await fetch('/api/inventory/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          ...values,
          purchase_date: values.purchase_date ? dayjs(values.purchase_date).format('YYYY-MM-DD') : undefined,
          warranty_expiry_date: values.warranty_expiry_date ? dayjs(values.warranty_expiry_date).format('YYYY-MM-DD') : undefined
        })
      });
      if (response.ok) {
        message.success('Inventory item added successfully');
        setIsModalVisible(false);
        form.resetFields();
        fetchInventoryItems();
      } else {
        throw new Error('Failed to create');
      }
    } catch (err) {
      message.error('Failed to add inventory item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch('/api/inventory/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      });
      if (response.ok) {
        message.success('Inventory item deleted successfully');
        fetchInventoryItems();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err) {
      message.error('Failed to delete inventory item');
    }
  };

  const filteredItems = inventoryItems?.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category.toLowerCase().includes(searchText.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  }) || [];

  const columns: ColumnsType<InventoryItemType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Button type="link" onClick={() => {
            setSelectedItem(record);
            form.setFieldsValue({
              ...record,
              purchase_date: record.purchase_date ? dayjs(record.purchase_date) : undefined,
              warranty_expiry_date: record.warranty_expiry_date ? dayjs(record.warranty_expiry_date) : undefined
            });
            setIsModalVisible(true);
          }}>
            {text}
          </Button>
        </div>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag color="purple">{text}</Tag>
    },
    {
      title: 'Subcategory',
      dataIndex: 'subcategory',
      key: 'subcategory'
    },
    {
      title: 'Room',
      dataIndex: 'room_name',
      key: 'room_name'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (qty, record) => (
        <span className={qty <= record.low_stock_alert ? 'text-red-500 font-bold' : ''}>
          {qty} {record.unit}
        </span>
      )
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
      render: (condition) => (
        <Tag color={condition === 'New' ? 'green' : condition === 'Good' ? 'blue' : condition === 'Fair' ? 'orange' : 'red'}>
          {condition}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'lost' ? 'red' : 'default'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Value',
      dataIndex: 'current_value',
      key: 'current_value',
      render: (value) => value ? 'PKR ' + value.toLocaleString() : 'N/A'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" onClick={() => {
            setSelectedItem(record);
            form.setFieldsValue(record);
            setIsModalVisible(true);
          }} />
          <Popconfirm
            title="Delete this inventory item?"
            onConfirm={() => handleDeleteItem(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const categories = [...new Set(inventoryItems.map(item => item.category))];
  const statuses = [...new Set(inventoryItems.map(item => item.status))];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="flex items-center gap-3">
            <InboxOutlined />
            Inventory Management
          </Title>
          <Text type="secondary">Track and manage all your household items</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedItem(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add Inventory Item
        </Button>
      </div>

      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search items..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by Category"
            allowClear
            value={categoryFilter}
            onChange={setCategoryFilter}
          >
            {categories.map(cat => (
              <Select.Option key={cat} value={cat}>{cat}</Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Filter by Status"
            allowClear
            value={statusFilter}
            onChange={setStatusFilter}
          >
            {statuses.map(stat => (
              <Select.Option key={stat} value={stat}>{stat}</Select.Option>
            ))}
          </Select>
        </div>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={filteredItems}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 15 }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                <Text strong>Total Items: {filteredItems.length}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text strong>Total Value: PKR {filteredItems.reduce((sum, item) => sum + (item.current_value || 0), 0).toLocaleString()}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Card>

      <Modal
        title={selectedItem ? 'Edit Inventory Item' : 'Add Inventory Item'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedItem(null);
        }}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={handleCreateItem} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
              <Input placeholder="e.g., Refrigerator, Sofa, Laptop" />
            </Form.Item>
            <Form.Item name="barcode" label="Barcode/QR Code">
              <Input placeholder="Scan or enter barcode" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select placeholder="Select category">
                <Select.Option value="Kitchen">Kitchen</Select.Option>
                <Select.Option value="Furniture">Furniture</Select.Option>
                <Select.Option value="Electronics">Electronics</Select.Option>
                <Select.Option value="Appliances">Appliances</Select.Option>
                <Select.Option value="Clothing">Clothing</Select.Option>
                <Select.Option value="Jewelry">Jewelry</Select.Option>
                <Select.Option value="Tools">Tools</Select.Option>
                <Select.Option value="Office">Office</Select.Option>
                <Select.Option value="Garage">Garage</Select.Option>
                <Select.Option value="Warehouse">Warehouse</Select.Option>
                <Select.Option value="Farm">Farm</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="subcategory" label="Subcategory">
              <Input placeholder="e.g., Cookware, Cutlery" />
            </Form.Item>
            <Form.Item name="brand" label="Brand">
              <Input placeholder="e.g., Samsung, Sony" />
            </Form.Item>
            <Form.Item name="room_id" label="Room">
              <Select placeholder="Select room">
                <Select.Option value="">Not assigned to a room</Select.Option>
                <Select.Option value="kitchen">Kitchen</Select.Option>
                <Select.Option value="living">Living Room</Select.Option>
                <Select.Option value="bedroom">Bedroom</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" initialValue={1}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="unit" label="Unit" initialValue="unit">
              <Select>
                <Select.Option value="unit">Unit</Select.Option>
                <Select.Option value="kg">Kilogram</Select.Option>
                <Select.Option value="g">Gram</Select.Option>
                <Select.Option value="liter">Liter</Select.Option>
                <Select.Option value="ml">Milliliter</Select.Option>
                <Select.Option value="box">Box</Select.Option>
                <Select.Option value="packet">Packet</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="purchase_price" label="Purchase Price (PKR)">
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="current_value" label="Current Value (PKR)">
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="purchase_date" label="Purchase Date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="warranty_expiry_date" label="Warranty Expiry Date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="condition" label="Condition" initialValue="Good">
              <Select>
                <Select.Option value="New">New</Select.Option>
                <Select.Option value="Good">Good</Select.Option>
                <Select.Option value="Fair">Fair</Select.Option>
                <Select.Option value="Poor">Poor</Select.Option>
                <Select.Option value="Broken">Broken</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Status" initialValue="active">
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="lost">Lost</Select.Option>
                <Select.Option value="damaged">Damaged</Select.Option>
                <Select.Option value="sold">Sold</Select.Option>
                <Select.Option value="donated">Donated</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="low_stock_alert" label="Low Stock Alert" initialValue={5}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="location" label="Location" className="md:col-span-2">
              <Input placeholder="Specific location within room" />
            </Form.Item>
            <Form.Item name="notes" label="Notes" className="md:col-span-2">
              <Input.TextArea rows={3} placeholder="Additional notes about the item" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {selectedItem ? 'Update Item' : 'Add Item'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Inventory;