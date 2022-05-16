import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { Form, Input, Space } from "antd";
import { MinusCircleOutlined} from "@ant-design/icons";

export default function AddElection ({save}){

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const onSubmitElection = async ({position, description, names }) => {
    const candidates = [];
    for (const index in names) {
      candidates.push(names[index].name);
    }
    save({candidates, position, description})
    handleClose();
  };
  

  return (
    <>
     
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Election</Modal.Title>
        </Modal.Header>
        <Form name="election" onFinish={onSubmitElection} >
          <Modal.Body>
              <Space style={{ display: "flex", marginBottom: 16 }} align="baseline">
                <Form.Item label="Position" name="position" rules={[{ required: "true", message: "Missing Position" }]}>
                <Input placeholder="positon" />
              </Form.Item>
              </Space>
              <Space style={{ display: "flex", marginBottom: 16}} align="baseline">
                <Form.Item label="Description" name="description" rules={[{ required: "true", message: "Missing Description" }]}>
                  <Input placeholder="description" />
                </Form.Item>
              </Space>
              <Space style={{ display: "flex", marginBottom: 4 }} align="baseline">
                Candidates
              </Space>
              <Space style={{ display: "flex", marginBottom: 16 }} align="baseline">  
                <Form.List name="names" >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: "flex", marginBottom: 16}} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[{ required: "true", message: "Missing candidate name" }]}
                        >
                          <Input placeholder="Enter candidate name" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button onClick={() => add()} >
                        Add Candidate
                      </Button>
                    </Form.Item>
                  </>
                )}
                </Form.List>
              </Space>
               </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Close
                </Button>
                <Form.Item>
                <Button type="primary" >
                  Submit
                </Button>
              </Form.Item>
              </Modal.Footer>
            </Form>
      </Modal>
    </>
  );
};

AddElection.propTypes = {
  save: PropTypes.func.isRequired,
};