import {
  Button,
  Flex,
  Group,
  PasswordInput,
  Select,
  SelectItem,
  Stack,
  TextInput,
  Title,
  Text,
  Box,
  rem,
  Popover,
  Progress,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { primaryButtonColor } from "../../../constants/colors";
import { notifications } from "@mantine/notifications";
import {
  CoreTeamRegisterModel,
  FacilitatorRegisterModel,
  GooglerRegisterModel,
  LeadRegisterModel,
  RegisterCoreTeam,
  RegisterFacilitator,
  RegisterGoogler,
  RegisterLead,
  UserRegisterModel,
  UserType,
} from "../../../types";
import SubtleLinkButton from "../../buttons/SubtleLinkButton";
import { isErrorResponse } from "../../../utils/utils";
import { useRegisterLead } from "../../../hooks/auth/useRegisterLead";
import { forwardRef, useState } from "react";
import { IconCheck, IconSchool, IconX } from "@tabler/icons-react";
import { useRegisterCoreTeam } from "../../../hooks/auth";
import { useRegisterFacilitator } from "../../../hooks/auth/useRegisterFacilitator";
import { useRegisterGoogler } from "../../../hooks/auth/useRegisterGoogler";

import { useTranslation } from 'react-i18next';

interface RegisterLeadProps {
  universityData: Array<SelectItem>;
  userTypeData: Array<SelectItem>;
}

interface UniversitySelectItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
}


const CustomUniversitySelectItem = forwardRef<
  HTMLDivElement,
  UniversitySelectItemProps
>(({ label, description, ...others }: UniversitySelectItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <IconSchool />
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

interface UserTypeSelectItemProps
  extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.ReactNode;
  label: string;
  description: string;
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

function getConfirmStrength (
    confirmRequirements: Array<any>, 
    password: string, 
    confirmPassword: string) {
  let multiplier = password === confirmPassword ? 0 : 1;
  return Math.max(
    100 - (100 / (confirmRequirements.length + 1)) * multiplier,
    10
  );
}

function getStrength(requirements: {
    re: RegExp;
    label: string;
  }[],
    password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

const UserTypeSelectItem = forwardRef<HTMLDivElement, UserTypeSelectItemProps>(
  ({ icon, label, description, ...others }: UserTypeSelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        {icon}
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const RegisterForm = ({ universityData, userTypeData }: RegisterLeadProps) => {
  
const { t } = useTranslation();


const requirements = [
  { re: /[0-9]/, label: t('components:forms:register:passwordRequirements:number') },
  { re: /[a-z]/, label: t('components:forms:register:passwordRequirements:lowercase') },
  { re: /[A-Z]/, label: t('components:forms:register:passwordRequirements:uppercase') },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: t('components:forms:register:passwordRequirements:specialSymbol') },
];

const confirmRequirements = [{ re: "", label: t('components:forms:register:passwordRequirements:passwordsMatch') }];

  
  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      universityId: 0,
      userType: UserType.Lead,
    },
    validate: {
      name: (value) => (value === "" ? t('components:forms:register:validationMessages:nameEmpty') : null),
      surname: (value) =>
        value === "" ? t('components:forms:register:validationMessages:surnameEmpty') : null,
      username: (value) =>
        value === "" ? t('components:forms:register:validationMessages:usernameEmpty') : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('components:forms:register:validationMessages:invalidEmail') ),
      password: (value) =>
        value === "" ? t('components:forms:register:validationMessages:passwordEmpty')  : null,
      confirmPassword: (value, values) =>
        value !== values.password ? t('components:forms:register:validationMessages:passwordsNotMatching')  : null,
      universityId: (value, values) =>
        (values.userType === UserType.Lead ||
          values.userType === UserType.CoreTeamMember ||
          values.userType === UserType.Facilitator) &&
        Number(value) > 0
          ? null
          : t('components:forms:register:validationMessages:selectUniversity'),
    },
  });

  const [popoverOpened, setPopoverOpened] = useState(false);
  const [popoverOpenedConfirm, setPopoverOpenedConfirm] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const confirmChecks = confirmRequirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={form.values.password === form.values.confirmPassword}
    />
  ));

  const confirmStrength = getConfirmStrength(
    confirmRequirements,
    form.values.password,
    form.values.confirmPassword
  );
  const confirmColor =
    confirmStrength === 100 ? "teal" : confirmStrength >= 50 ? "yellow" : "red";

  const strength = getStrength(requirements, form.values.password);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const navigate = useNavigate();
  const { register: registerLead } = useRegisterLead();
  const { register: registerCoreTeam } = useRegisterCoreTeam();
  const { register: registerFacilitator } = useRegisterFacilitator();
  const { register: registerGoogler } = useRegisterGoogler();

  const onRegister = async () => {
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }
    let res;

    const user: UserRegisterModel = {
      name: form.values.name,
      surname: form.values.surname,
      username: form.values.username,
      email: form.values.email,
      password: form.values.password,
    };

    if (form.values.userType === UserType.Lead) {
      const lead: LeadRegisterModel = {
        universityId: form.values.universityId,
      };
      const registerInfo: RegisterLead = {
        user,
        lead,
      };
      res = await registerLead(registerInfo);
    } else if (form.values.userType === UserType.CoreTeamMember) {
      const coreTeam: CoreTeamRegisterModel = {
        universityId: form.values.universityId,
      };
      const registerInfo: RegisterCoreTeam = {
        user,
        coreTeam,
      };
      res = await registerCoreTeam(registerInfo);
    } else if (form.values.userType === UserType.Facilitator) {
      const facilitator: FacilitatorRegisterModel = {
        universityId: form.values.universityId,
      };
      const registerInfo: RegisterFacilitator = {
        user,
        facilitator,
      };
      res = await registerFacilitator(registerInfo);
    } else if (form.values.userType === UserType.Googler) {
      const googler: GooglerRegisterModel = {};
      const registerInfo: RegisterGoogler = {
        user,
        googler,
      };

      res = await registerGoogler(registerInfo);
    }
    if (!res || isErrorResponse(res)) {
      notifications.show({
        id: "registration-fail",
        title: t('components:forms:register:registrationFailedTitle'),
        message: res
          ? res.msg
          : t('components:forms:register:registrationFailedMessage'),
        autoClose: 5000,
        withCloseButton: true,
        style: { backgroundColor: "red" },
        styles: (theme) => ({
          title: { color: theme.white },
          description: { color: theme.white },
        }),
      });
      return;
    }

    notifications.show({
      id: "registration-success",
      title: t('components:forms:register:registrationSuccessTitle'),
      message: t('components:forms:register:registrationSuccessMessage'),
      autoClose: 5000,
      withCloseButton: true,
      style: { backgroundColor: "green" },
      styles: (theme) => ({
        title: { color: theme.white },
        description: { color: theme.white },
      }),
    });

    navigate("/verify-email");
  };

  return (
    <Stack spacing={"xl"}>
      <Title size="32px" align="center">
        {t('components:forms:register:title')}
      </Title>
      <form>
        <Flex direction={"column"} gap={"xs"}>
          <Flex direction={"row"} gap={"xs"}>
            <TextInput 
              label={t('components:forms:register:nameLabel')} 
              {...form.getInputProps("name")} 
            />
            <TextInput 
              label={t('components:forms:register:surnameLabel')} 
              {...form.getInputProps("surname")} 
            />
          </Flex>
          <TextInput 
              label={t('components:forms:register:usernameLabel')} 
            {...form.getInputProps("username")} 
          />
          <TextInput 
              label={t('components:forms:register:emailLabel')} 
            {...form.getInputProps("email")} 
          />

          <Popover
            opened={popoverOpened}
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}
              >
                <PasswordInput
                  label={t('components:forms:register:passwordLabel')}
                  {...form.getInputProps("password")}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} mb="xs" />
              <PasswordRequirement
                label={t('components:forms:register:passwordRequirements:minLength')}
                meets={form.values.password.length > 5}
              />
              {checks}
            </Popover.Dropdown>
          </Popover>

          <Popover
            opened={popoverOpenedConfirm}
            position="bottom"
            width="target"
            transitionProps={{ transition: "pop" }}
          >
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpenedConfirm(true)}
                onBlurCapture={() => setPopoverOpenedConfirm(false)}
              >
                <PasswordInput
                  label={t('components:forms:register:confirmPasswordLabel')}
                  {...form.getInputProps("confirmPassword")}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress
                color={confirmColor}
                value={confirmStrength}
                size={5}
                mb="xs"
              />
              <PasswordRequirement
                label={t('components:forms:register:passwordRequirements:minLength')}
                meets={form.values.confirmPassword.length > 5}
              />
              {confirmChecks}
            </Popover.Dropdown>
          </Popover>

          <Select
            label={t('components:forms:register:userTypeLabel')}
            placeholder={t('components:forms:register:userTypePlaceholder')}
            itemComponent={UserTypeSelectItem}
            data={userTypeData}
            searchable
            withAsterisk
            {...form.getInputProps("userType")}
          />
          {(form.values.userType === UserType.Lead ||
            form.values.userType === UserType.CoreTeamMember ||
            form.values.userType === UserType.Facilitator) && (
            <Select
              label={t('components:forms:register:universityLabel')}
              placeholder={t('components:forms:register:universityPlaceholder')}
              itemComponent={CustomUniversitySelectItem}
              data={universityData}
              searchable
              withAsterisk
              {...form.getInputProps("universityId")}
            />
          )}
          <Button onClick={onRegister} bg={primaryButtonColor}>
            {t('components:forms:register:registerButton')}
          </Button>
          <SubtleLinkButton to="/login" size="sm">
            {t('components:forms:register:loginPrompt')}
          </SubtleLinkButton>
        </Flex>
      </form>
    </Stack>
  );
};

export default RegisterForm;
