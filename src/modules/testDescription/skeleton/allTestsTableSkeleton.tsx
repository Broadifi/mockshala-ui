import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
}

export function AllTestsTableSkeleton({ rows = 6 }: TableSkeletonProps) {
  return (
    <Table className="w-full border-collapse">
      {/* Header (real, not skeleton) */}
      <TableHeader className="sticky top-0 z-50 bg-white">
        <TableRow>
          <TableHead>Difficulty</TableHead>
          <TableHead className="text-center">Test Type</TableHead>
          <TableHead className="pl-2">Test Name</TableHead>
          <TableHead className="text-center">Questions</TableHead>
          <TableHead className="text-center">Duration</TableHead>
          <TableHead className="text-center">Max Score</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      {/* Skeleton body */}
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-4 w-20" />
            </TableCell>

            <TableCell className="flex justify-center">
              <Skeleton className="h-6 w-20 rounded-full" />
            </TableCell>

            <TableCell className="max-w-xs">
              <Skeleton className="h-4 w-[220px]" />
            </TableCell>

            <TableCell className="text-center">
              <Skeleton className="h-4 w-10 mx-auto" />
            </TableCell>

            <TableCell className="text-center">
              <Skeleton className="h-4 w-14 mx-auto" />
            </TableCell>

            <TableCell className="text-center">
              <Skeleton className="h-4 w-12 mx-auto" />
            </TableCell>

            <TableCell className="text-right">
              <Skeleton className="h-9 w-24 ml-auto rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
