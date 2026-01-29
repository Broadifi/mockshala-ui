import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TestDescription() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div className="max-w-6xl w-full rounded-2xl border shadow-lg p-4 bg-white flex flex-col gap-3">
      <div>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex gap-5">
            <TabsTrigger value="All Tests">Overview</TabsTrigger>
            <TabsTrigger value="Group by difficulty level">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="Group by test type">Reports</TabsTrigger>
            <TabsTrigger value="Test description">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="All Tests">
            <Card>
              <CardHeader>
                <CardTitle>All Tests</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">
                          {invoice.invoice}
                        </TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right">
                          {invoice.totalAmount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Total</TableCell>
                      <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
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
