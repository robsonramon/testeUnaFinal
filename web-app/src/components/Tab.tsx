import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface CustomTabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="customized tabs example"
      >
        {tabs.map((tab, index) => (
          <Tab 
            key={index} 
            value={index} 
            label={tab.label} 
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'transparent', // Remove o fundo quando a aba está selecionada
                color: 'primary.main', // Cor do texto da aba selecionada
              },
              '&:focus': {
                outline: 'none', // Remove o contorno de foco
              },
            }} 
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default CustomTabs;
