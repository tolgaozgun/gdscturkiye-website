import { Group, Menu } from "@mantine/core";
import {
  IconBackpack,
  IconCar,
  IconListDetails,
  IconLogout,
  IconPencil,
  IconSearch,
  IconTicket,
  IconUserCircle,
} from "@tabler/icons-react";
import { useLogout } from "../../hooks/auth";
import SubtleLinkButton from "../buttons/SubtleLinkButton";
import UserButton from "../buttons/UserButton";
import { useUser } from "../../contexts/UserContext";

const CoreTeamMemberMenu = () => {
  const userResponse = useUser();

  if (!userResponse.user) {
    return null;
  }

  const user = userResponse.user;

  const { logout } = useLogout();
  const onLogout = () => {
    logout();
  };

  return (
    <Group position="center">
      <Menu withArrow>
        <Menu.Target>
          <UserButton email={user.email} name={user.name} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <SubtleLinkButton
              to="/traveler/profile"
              size="sm"
              leftIcon={<IconUserCircle />}
            >
              Profile
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton
              to="/search-fare"
              size="sm"
              leftIcon={<IconSearch />}
            >
              Search Tickets
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton
              to="/traveler/tickets"
              size="sm"
              leftIcon={<IconTicket />}
            >
              My Tickets
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton
              to="/traveler/travel-list"
              size="sm"
              leftIcon={<IconListDetails />}
            >
              Travel List
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton
              to="/traveler/journey-plans"
              size="sm"
              leftIcon={<IconBackpack />}
            >
              Journey Planner
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton
              to="/my-reviews"
              size="sm"
              leftIcon={<IconPencil />}
            >
              My Reviews
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton to="/my-rentals" size="sm" leftIcon={<IconCar />}>
              My Rents
            </SubtleLinkButton>
          </Menu.Item>
          <Menu.Item>
            <SubtleLinkButton
              onClick={onLogout}
              size="sm"
              leftIcon={<IconLogout />}
              color="red"
              to="/login"
            >
              Log out
            </SubtleLinkButton>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};

export default CoreTeamMemberMenu;
