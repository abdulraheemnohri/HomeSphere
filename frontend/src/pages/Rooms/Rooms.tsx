import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Modal, Select, Table, Tag, message, Space, Typography, Form, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, HomeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Search } = Input;

interface RoomType {
  id: string;
  name: string;
  room_type: string;
  area: number;
  area_unit: string;
  floor_number: number;
  has_window: boolean;
  has_bathroom: boolean;
  has_ac: boolean;
  has_heater: boolean;
  cleaning_schedule: string;
  last_cleaned: string;
  next_cleaning: string;
  maintenance_notes: string;
  property_name: string;
  property_id: string;
  is_active: boolean;
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/rooms/', {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        const data = await response.json();
        setRooms(data);
      }
    } catch (err) {
      message.error('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async (values: any) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        message.success('Room added successfully');
        setIsModalVisible(false);
        form.resetFields();
        fetchRooms();
      }
    } catch (err) {
      message.error('Failed to add room');
    }
  };

  const handleDeleteRoom = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/rooms/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      });
      if (response.ok) {
        message.success('Room deleted successfully');
        fetchRooms();
      }
    } catch (err) {
      message.error('Failed to delete room');
    }
  };

  const filteredRooms = rooms?.filter(room =>
    room.name.toLowerCase().includes(searchText.toLowerCase()) ||
    room.room_type.toLowerCase().includes(searchText.toLowerCase()) ||
    room.property_name.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  const roomColumns: ColumnsType<RoomType> = [
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Button type="link" onClick={() => setSelectedRoom(record)}>
          {text}
        </Button>
      )
    },
    {
      title: 'Property',
      dataIndex: 'property_name',
      key: 'property_name'
    },
    {
      title: 'Type',
      dataIndex: 'room_type',
      key: 'room_type',
      render: (type) => <Tag color="cyan">{type}</Tag>
    },
    {
      title: 'Floor',
      dataIndex: 'floor_number',
      key: 'floor_number',
      render: (floor) => floor ? 'Floor ' + floor : 'Ground'
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      render: (area, record) => area ? area + ' ' + record.area_unit : 'N/A'
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" onClick={() => setSelectedRoom(record)} />
          <Popconfirm
            title="Delete this room?"
            onConfirm={() => handleDeleteRoom(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={2} className="flex items-center gap-3">
            <HomeOutlined />
            Room Management
          </Title>
          <Text type="secondary">Manage rooms in your properties</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedRoom(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add Room
        </Button>
      </div>

      <Card className="mb-6">
        <Input
          placeholder="Search rooms..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md"
        />
      </Card>

      {selectedRoom && (
        <Card title={`Room: ${selectedRoom.name}`} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text strong>Property: </Text>
              <Text>{selectedRoom.property_name}</Text>
              <br />
              <Text strong>Type: </Text>
              <Tag color="cyan">{selectedRoom.room_type}</Tag>
              <br />
              <Text strong>Floor: </Text>
              <Text>Floor {selectedRoom.floor_number || 'Ground'}</Text>
              <br />
              <Text strong>Area: </Text>
              <Text>{selectedRoom.area} {selectedRoom.area_unit}</Text>
            </div>
            <div>
              <Text strong>Cleaning Schedule: </Text>
              <Text>{selectedRoom.cleaning_schedule || 'Not set'}</Text>
              <br />
              <Text strong>Amenities: </Text>
              <div className="flex gap-2 mt-1">
                {selectedRoom.has_window && <Tag color="blue" size="small">Window</Tag>}
                {selectedRoom.has_bathroom && <Tag color="blue" size="small">Bathroom</Tag>}
                {selectedRoom.has_ac && <Tag color="blue" size="small">AC</Tag>}
                {selectedRoom.has_heater && <Tag color="blue" size="small">Heater</Tag>}
              </div>
            </div>
          </div>
          {selectedRoom.maintenance_notes && (
            <div className="mt-4">
              <Text strong>Maintenance Notes: </Text>
              <Text>{selectedRoom.maintenance_notes}</Text>
            </div>
          )}
          <Button
            onClick={() => setSelectedRoom(null)}
            className="mt-4"
          >
            Back to List
          </Button>
        </Card>
      )}

      <Card>
        <Table
          columns={roomColumns}
          dataSource={filteredRooms}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 15 }}
        />
      </Card>

      <Modal
        title={selectedRoom ? 'Edit Room' : 'Add Room'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedRoom(null);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateRoom} layout="vertical">
          <Form.Item name="name" label="Room Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Master Bedroom, Kitchen" />
          </Form.Item>
          <Form.Item name="property_id" label="Property" rules={[{ required: true }]}>
            <Select placeholder="Select property">
              <Select.Option value="1">Main House</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="room_type" label="Room Type" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              <Select.Option value="Bedroom">Bedroom</Select.Option>
              <Select.Option value="Kitchen">Kitchen</Select.Option>
              <Select.Option value="Bathroom">Bathroom</Select.Option>
              <Select.Option value="Living Room">Living Room</Select.Option>
              <Select.Option value="Dining Room">Dining Room</Select.Option>
              <Select.Option value="Study">Study</Select.Option>
              <Select.Option value="Store">Store</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="floor_number" label="Floor Number">
            <Input type="number" min={0} placeholder="0 for ground floor" />
          </Form.Item>
          <Form.Item name="area" label="Area">
            <Input type="number" min={0} addonAfter="sq ft" />
          </Form.Item>
          <Form.Item name="area_unit" label=" " initialValue="sq ft" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="cleaning_schedule" label="Cleaning Schedule">
            <Select placeholder="Select frequency">
              <Select.Option value="daily">Daily</Select.Option>
              <Select.Option value="weekly">Weekly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="occasional">Occasional</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="has_window" label="Has Window" valuePropName="checked" initialValue={false}>
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="has_bathroom" label="Has Bathroom" valuePropName="checked" initialValue={false}>
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="has_ac" label="Has AC" valuePropName="checked" initialValue={false}>
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="has_heater" label="Has Heater" valuePropName="checked" initialValue={false}>
            <Select>
              <Select.Option value={true}>Yes</Select.Option>
              <Select.Option value={false}>No</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="maintenance_notes" label="Maintenance Notes">
            <Input.TextArea rows={3} placeholder="Any maintenance issues or notes" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {selectedRoom ? 'Update Room' : 'Add Room'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Rooms;