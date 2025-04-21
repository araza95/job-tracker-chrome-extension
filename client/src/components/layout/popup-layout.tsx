// src/components/layout/PopupLayout.tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import { NewApplicationForm } from "../form/new-application-form";
import { ApplicationHistory } from "../history/application-history";
import { Settings } from "../settings";

export const PopupLayout = () => {
  return (
    <div className="w-[400px] h-[500px] bg-white">
      <header className="p-4 border-b">
        <h1 className="text-xl font-semibold">Job Application Tracker</h1>
      </header>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="w-full grid grid-cols-3 gap-4 p-4">
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <NewApplicationForm />
        </TabsContent>

        <TabsContent value="history">
          <ApplicationHistory />
        </TabsContent>

        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
