import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import { AuthScreen, CampaignDetailScreen, CreateCampaignScreen, HomeScreen } from "./screens";


export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
        errorElement: <div>Error loading home screen</div>,
      },
      {
        path: "/campaign/:id",
        element: <CampaignDetailScreen />,
        errorElement: <div>Error loading campaign detail screen</div>,
      }
      ,{
        path: "/campaign",
        element: <CreateCampaignScreen />,
        errorElement: <div>Error loading campaign screen</div>,
      }
      ,{
        path: "/auth",
        element: <AuthScreen />,
        errorElement: <div>Error loading auth screen</div>, 
      },
    

    ]  
  }
]);
