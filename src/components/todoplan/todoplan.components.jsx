import { Link } from "react-router-dom";
import BottomNavBar from "../globalcomponents/bottomnavbartodo.components";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import BottomNavBarTodo from "../globalcomponents/bottomnavbartodo.components";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ko } from "date-fns/locale";
import { Checkbox, Card, Button } from "antd";
import "./todoplan.components.css";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Oval } from "react-loader-spinner";

function TodoPlan() {
  const accessToken = localStorage.getItem("token");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notionNum, setNotionNum] = useState(0);
  const [growthNum, setGrowthNum] = useState(0);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        const response = await axios.get(
          `https://myplanit.link/todos/plan/${selectedDate.getFullYear()}-${(
            "0" +
            selectedDate.getMonth() +
            1
          ).slice(-2)}-${("0" + selectedDate.getDate()).slice(-2)}`,
          {
            Authorization: `Bearer ${accessToken}`,
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setData(Object.entries(response.data));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [selectedDate, rerender]);
  let navigate = useNavigate();

  function onChange(e) {}

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  if (loading)
    return (
      <div style={{ marginTop: "50vh", marginBottom: "auto" }}>
        <Oval color="#7965f4" height="40px" width="40px" />
        <BottomNavBarTodo />
      </div>
    );
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return null;
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MuiPickersUtilsProvider locale={ko} utils={DateFnsUtils}>
          <KeyboardDatePicker
            style={{ width: 210 }}
            disableToolbar
            format="M월 d일 eee요일"
            margin="normal"
            id="date-picker-outline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            keyboardIcon={
              <ExpandMoreIcon
                color="black"
                fontSize="large"
                style={{ padding: 0 }}
              />
            }
          />
        </MuiPickersUtilsProvider>
        <Link to="../main/buytemplate">
          <Button
            style={{
              marginLeft: 50,
              height: 25,
              width: 73,
              fontSize: 9,
              marginTop: 10,
            }}
          >
            MY PLAN
          </Button>
        </Link>
      </div>
      <span
        className="button-group"
        style={{ fontSize: "16px", fontWeight: "bold" }}
      >
        <Link
          to="../main"
          className="main-routine-button"
          style={{
            width: 42,
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            border: "1px",
            background: "#fbfbfb",
            borderRadius: "0",
            color: "black",
            borderBottom: " 2px solid #7965f4",
            paddingBottom: 2,
          }}
        >
          PLAN
        </Link>
        <div style={{ width: 15 }}></div>
        <Link
          style={{ border: "1px solid #D3d3d3" }}
          to="../main/todomy"
          className="main-growth-button"
          style={{
            width: 42,
            height: "17px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            border: "5px",
            background: "#fbfbfb",
            borderRadius: "0",
            color: "gray",
            marginRight: 30,
          }}
        >
          MY
        </Link>
        <div style={{ width: 190 }}></div>
      </span>
      <div style={{ height: "10px" }}></div>
      {data.map((plan, i) => {
        let title = plan[0];
        if (title.length > 17) {
          title = plan[0].slice(0, 16) + "...";
        }
        let percent = plan[1][0]["달성률"];
        let todos = plan[1].slice(1);
        let count = parseInt(todos.length) * 110;
        return (
          <Card
            key={i}
            style={{
              borderRadius: 5,
              width: 327,
              height: `${count}px`,
              marginTop: 9,
            }}
          >
            <span style={{ display: "flex" }}>
              <span
                style={{
                  display: "flex",
                  marginTop: "2px",
                  // fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {title}
                <span></span>
                <span style={{ marginLeft: 20 }}>
                  <span style={{ color: "#8977F7" }}>{percent}%</span> 달성
                </span>
              </span>
            </span>
            <hr style={{ opacity: 0.2 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {todos.map((item, i) => {
                return (
                  <Checkbox
                    key={i}
                    style={{ marginLeft: 0, marginTop: 12 }}
                    checked={plan[1][1]["finish_flag"]}
                    onChange={(e) => {
                      if (e.target.checked) {
                        axios.post(
                          `https://myplanit.link/todos/plan/${plan[1][1]["plan_id"]}/${plan[1][1]["id"]}/check`,
                          { token: `Bearer ${accessToken}` },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${accessToken}`,
                            },
                          }
                        );
                        setRerender(!rerender);
                      } else {
                        // setNotionNum(notionNum - 1);
                        axios.post(
                          `https://myplanit.link/todos/plan/${plan[1][1]["plan_id"]}/${plan[1][1]["id"]}/check`,
                          { token: `Bearer ${accessToken}` },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${accessToken}`,
                            },
                          }
                        );
                        setRerender(!rerender);
                      }
                    }}
                  >
                    <span style={{ width: "100%" }}>
                      <span>{item["plan_todo"]}</span>
                      <span>
                        <img
                          src="images/detail.png"
                          onClick={() => {
                            navigate(`/todo/detail/${item["todo_id"]}`);
                          }}
                          style={{
                            width: 8,
                            marginLeft: 50,
                          }}
                        />
                      </span>
                    </span>
                  </Checkbox>
                );
              })}
            </div>
          </Card>
        );
      })}
      <br />
      <br />
      <br />
      <BottomNavBarTodo style={{ height: "200px" }} />
      <div
        style={{
          height: "33px",
          backgroundColor: "white",
          width: "100vw",
          position: "fixed",
          bottom: "0px",
        }}
      ></div>
    </div>
  );
}

export default TodoPlan;
