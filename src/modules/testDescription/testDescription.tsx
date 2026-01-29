import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllTests from "./allTests";


function TestDescription() {
  

  return (
    <div className="max-w-6xl w-full rounded-2xl border shadow-lg p-4 bg-white flex flex-col gap-3">
      <div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex gap-5">
            <TabsTrigger value="All Tests">All Tests</TabsTrigger>
            <TabsTrigger value="Group by difficulty level">
              Group by difficulty level
            </TabsTrigger>
            <TabsTrigger value="Group by test type">Group by test type</TabsTrigger>
            <TabsTrigger value="Test description">Test description</TabsTrigger>
          </TabsList>

          <TabsContent value="All Tests">
            <Card>
              <CardHeader>
                <CardTitle>All Tests</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                  <AllTests />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Group by difficulty level">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  Track performance and user engagement metrics. Monitor trends
                  and identify growth opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Page views are up 25% compared to last month.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Group by test type">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  Generate and download your detailed reports. Export data in
                  multiple formats for analysis.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                You have 5 reports ready and available to export.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Test description">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and options. Customize your
                  experience to fit your needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                Configure notifications, security, and themes.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* <h1 className="text-gray-700 font-semibold">Description</h1> */}
    </div>
  );
}

export default TestDescription;
