import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts";
import { AuthScreen, CampaignDetailScreen, HomeScreen } from "./screens";


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
        path: "/auth",
        element: <AuthScreen />,
        errorElement: <div>Error loading auth screen</div>, 
      },
    

    ]  
  }
]);
