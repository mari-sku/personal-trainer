import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; 
import BarChartIcon from "@mui/icons-material/BarChart";

import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import TrainingCalendar from "./components/TrainingCalendar";
import TrainingCharts from "./components/TrainingCharts";

const drawerWidth = 240;

export default function App() {

  // drawer functionality and code are from MUI persistent drawer example
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<"customers" | "trainings" | "calendar" | "charts">("customers"); 

  const handleSelectPage = (page: "customers" | "trainings" | "calendar" | "charts") => {
    setSelectedPage(page);
    setDrawerOpen(false); // close drawer after selection
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"

        //Appbar width adjustment when drawer is open and animations
        sx={{
          width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
          ml: drawerOpen ? `${drawerWidth}px` : 0,
          transition: theme =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar>

          {/* hamburger menu icon to open drawer */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, ...(drawerOpen && { display: "none" }) }} // hide button if drawer is open
          >
            <MenuIcon />
          </IconButton>

          {/* appbar title */}
          <Typography variant="h6" noWrap>
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* persistent drawer */}
      <Drawer
        variant="persistent"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* drawer header with close button */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", p: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ ml: 0 }}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <List>
          {/* customers menu item on drawer*/}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelectPage("customers")}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </ListItem>

          {/* trainings menu item on drawer */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelectPage("trainings")}>
              <ListItemIcon>
                <DirectionsRunIcon />
              </ListItemIcon>
              <ListItemText primary="Trainings" />
            </ListItemButton>
          </ListItem>

          {/* calendar menu item on drawer */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleSelectPage("calendar")}>
              <ListItemIcon>
                <CalendarTodayIcon/>
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </ListItem>

          {/* statistics menu item on drawer */}
          <ListItem disablePadding>
              <ListItemButton onClick={() => handleSelectPage("charts")}>
                <ListItemIcon>
                 <BarChartIcon />
              </ListItemIcon>
         <ListItemText primary="Statistics" />
       </ListItemButton>
      </ListItem>
        </List>
      </Drawer>

      {/* main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px", // AppBar height
          transition: theme =>  // animations 
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: drawerOpen ? `${drawerWidth}px` : 0, // shift content right when drawer is open; flush left when closed
        }}
      >
        {/* conditionally render page components */}
        {selectedPage === "customers" && <Customerlist />}
        {selectedPage === "trainings" && <Traininglist />}
        {selectedPage === "calendar" && <TrainingCalendar />}
        {selectedPage === "charts" && <TrainingCharts />}

      </Box>
    </Box>
  );
}
