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
import { useEffect, useState } from "react";

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
  const [urlInput, setUrlInput] = useState(imageUrl);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("dark-mode", !!options.darkMode);
    }
  }, [options.darkMode]);

  // Keep the URL field in sync with the canonical imageUrl whenever
  // options change (unless the user is actively editing it).
  useEffect(() => {
    setUrlInput(imageUrl);
  }, [imageUrl]);

  const KNOWN_FIELDS = new Set([
    "username",
    "theme",
    "template",
    "border_radius",
    "border_width",
    "card_radius",
    "card_border_width",
    "stat_radius",
    "stat_border_width",
    "title_color",
    "text_color",
    "icon_color",
    "border_color",
    "bg_color",
    "tag_1_color",
    "tag_2_color",
    "tag_3_color",
    "chart_total_color",
    "box_border_color",
    "cache_seconds",
  ]);

  const handleUrlSubmit = () => {
    try {
      const trimmed = urlInput.trim();
      const url = new URL(
        trimmed.startsWith("http") ? trimmed : `${window.location.origin}${trimmed}`
      );
      const params = url.searchParams;
      const templateFromPath = (url.pathname.match(/\/api\/(card|graph|badge)/) || [])[1];
      const next = { ...options };

      if (templateFromPath) next.template = templateFromPath;
      params.forEach((value, key) => {
        if (KNOWN_FIELDS.has(key)) next[key] = value;
      });

      setOptions(next);
      // If the URL explicitly sets a different image, push it through so
      // the preview updates immediately even if no known field changed.
      updateImage(next);
      if (templateFromPath) updateImage(next);
      api.success({ message: "URL applied", placement: "topRight", duration: 2 });
    } catch (err) {
      api.error({
        message: "Invalid URL",
        description: "Make sure it points to /api/card, /api/graph or /api/badge.",
        placement: "topRight",
        duration: 3,
      });
    }
  };

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
                  <Form.Item className="form-item url-field" label="Image URL">
                    <Input.TextArea
                      className="url-textarea"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onPressEnter={(e) => {
                        if (!e.shiftKey) {
                          e.preventDefault();
                          handleUrlSubmit();
                        }
                      }}
                      autoComplete="off"
                      spellCheck={false}
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                    <Button
                      type="primary"
                      className="url-submit"
                      onClick={handleUrlSubmit}
                    >
                      Submit
                    </Button>
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
