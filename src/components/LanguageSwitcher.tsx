import { useState } from 'react';
import { UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import EnglishFlag from "../assets/flags/english.png"
import TurkishFlag from "../assets/flags/turkish.png"
import classes from './LanguageSwitcher.module.css';
import { useTranslation } from 'react-i18next';

type Language = {
  label: string;
  image: string;
  code: string;
}

const data: Language[] = [
  { label: 'English', image: EnglishFlag, code: "en" },
  { label: 'Türkçe', image: TurkishFlag, code: "tr" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [opened, setOpened] = useState(false);

  // Set the initial selected to the array element whose code is i18n.language
  const [selected, setSelected] = useState(data.find((item) => item.code === i18n.language) || data[0]);

  

  
  const changeLanguage = (item: Language) => {
    i18n.changeLanguage(item.code);
    setSelected(item);
  };
  
  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} width={18} height={18} />}
      onClick={() => changeLanguage(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

export default LanguageSwitcher;