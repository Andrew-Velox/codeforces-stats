import Image from "next/image";
import {
  GithubFilled,
  BookFilled,
  ExportOutlined,
  CopyOutlined,
  BulbOutlined,
  BulbFilled,
} from "@ant-design/icons";
import {
  Space,
  Card,
  Col,
  Form,
  Input,
  Select,
  Radio,
  Button,
  Divider,
  Row,
  Spin,
  Switch,
  notification,
} from "antd";
import { useEffect } from "react";

import themes from "@/themes.js";
import Logo from "@/images/logo.png";
import Error from "@/images/error.svg";
import useOption from "@/hooks/option.js";


export default function Home() {
  const {
    options,
    setOptions,
    imageUrl,
    updateImage,
    error,
    setError,
    loading,
    setLoading,
    checkHandleNotFound,
  } = useOption();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("dark-mode", !!options.darkMode);
    }
  }, [options.darkMode]);

  const openNotification = (message, description) => {
    api.info({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  const handleFieldsChange = async (changed_value) => {
    setOptions((prev) => {
      const newOptions = {
        ...prev,
        [changed_value[0].name]: changed_value[0].value,
      };
      if (changed_value[0].name[0] !== "username") {
        updateImage(newOptions);
      }
      return newOptions;
    });
  };


  const handleOpenInNewTab = () => {
    window.open(imageUrl, "_blank");
  };

  const handleUsernameEnter = () => {
    checkHandleNotFound().then(() => {
      openNotification("Error", "Handle not found!");
    });
    updateImage(options);
  };

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {contextHolder}
      <Space className="main-body">
        <Card className="card">
          <Col className="card-col">
            <div className="header">
              <div className="header-top">
                <Space>
                  <Image src={Logo} alt="Logo" width={28} height={28} />
                  <h1 className="header-title">Codeforces Stats</h1>
                </Space>
                <Space size="small" className="dark-toggle">
                  {options.darkMode ? <BulbFilled /> : <BulbOutlined />}
                  <Switch
                    checked={!!options.darkMode}
                    onChange={(checked) =>
                      setOptions((prev) => ({ ...prev, darkMode: checked }))
                    }
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                  />
                </Space>
              </div>
              <p>
                ⚡ Dynamically generated Codeforces stats for your Github
                profile!
              </p>
            </div>

            <Row className="row" gutter={[10, 10]}>
              <Col className="form">
                <Form
                  name="Card Input"
                  layout="horizontal"
                  labelCol={{ span: 9 }}
                  initialValues={options}
                  onFieldsChange={handleFieldsChange}
                >
                  <Form.Item
                    className="form-item"
                    label="Codeforces Handle"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Codeforces Handle!",
                      },
                    ]}
                  >
                    <Space.Compact
                      style={{
                        width: "100%",
                      }}
                    >
                      <Input
                        defaultValue={options.username}
                        autoComplete="off"
                        spellCheck={false}
                        onPressEnter={handleUsernameEnter}
                      />
                      <Button type="primary" onClick={handleUsernameEnter}>
                        Submit
                      </Button>
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item className="form-item" label="Theme" name="theme">
                    <Select
                      showSearch
                      options={Object.keys(themes).map((theme) => {
                        return { value: theme, label: theme };
                      })}
                    />
                  </Form.Item>
                  <Form.Item className="form-item" label="Template" name="template">
                    <Select
                      options={[
                        { value: "card", label: "Card" },
                        { value: "graph", label: "Rating Graph" },
                        { value: "badge", label: "Badge" },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item className="form-item">
                    <Space className="submit-wrapper">
                      
                      <Button
                        type="default"
                        onClick={handleOpenInNewTab}
                        disabled={error || loading}
                      >
                        <ExportOutlined />
                        Open Image in new tab
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Col>

              <Col className="image-output">
                <Spin spinning={loading}>
                  <img
                    src={error ? Error.src : imageUrl}
                    alt="Codeforces-Stats"
                    onLoad={handleLoad}
                    onError={handleError}
                  />
                </Spin>
              </Col>
            </Row>

            <Divider className="divider" />
            <Space className="footer">
              <a href="https://github.com/Andrew-Velox/codeforces-stats">
                <GithubFilled />
                Github
              </a>
              
            </Space>
          </Col>
        </Card>
      </Space>
    </>
  );
}
