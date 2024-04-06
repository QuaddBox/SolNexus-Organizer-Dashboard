/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { forwardRef } from "react";
// import { IconChevronRight } from "@tabler/icons-react"
import { IoChevronForwardSharp } from "react-icons/io5";
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  Loader,
} from "@mantine/core";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import "../assets/styles/dashboardRoot.scss";
import { GoArrowSwitch } from "react-icons/go";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// eslint-disable-next-line react/display-name
const UserButton = forwardRef(
  ({ user, image, name, email, icon, ...others }, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        // padding: "var(--mantine-spacing-md)",
        padding: "10px",
        color: "var(--mantine-color-text)",
        // borderRadius: "var(--mantine-radius-sm)",
        backgroundColor: "#141414",
        borderRadius: "12px",
      }}
      {...others}
    >
      {user ? (
        <Group>
          <Avatar src={image} radius="xl" />

          <div style={{ flex: 1 }} className="nameContainers">
            <Text size="sm" fw={500} color="white">
              {name}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || <IoChevronForwardSharp size="1rem" color="white" />}
        </Group>
      ) : (
        <Group>
          <div className="h-10 w-10 bg-[#2d2d2d] rounded-full animate-pulse" />

          <div style={{ flex: 1 }} className="nameContainers">
            <div className="bg-[#2d2d2d] w-24 h-3 rounded-sm animate-pulse " />
            <div className="bg-[#2d2d2d] w-24 h-3 rounded-sm animate-pulse" />
          </div>

          {icon || <IoChevronForwardSharp size="1rem" color="white" />}
        </Group>
      )}
    </UnstyledButton>
  )
);
export default function Data() {
  const { user } = useContext(AuthContext);
  // console.log(user)
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          user={user}
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name={user ? user.name : "N/A"}
          email={user ? user.email : "N/A"}
        />
      </Menu.Target>
      {/* ... menu items */}
      <Menu.Dropdown>
        {/* <Menu.Label>Edit </Menu.Label> */}
        <Menu.Item leftSection={<GoArrowSwitch size={14} />}>
          <Link to={"https://sol-nexus.vercel.app/"}>Switch To Attending</Link>
        </Menu.Item>
        <Menu.Item leftSection={<Avatar size={14} />}>
          <Link to={"/organizations/profile"}>View Profile</Link>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" leftSection={<MdOutlineDelete size={14} />}>
          Delete Account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
