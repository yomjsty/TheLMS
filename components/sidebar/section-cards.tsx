import { adminGetDashboardStat } from "@/app/dal/admin/admin-get-dashboard-stat"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconBook2, IconPlaylistX, IconShoppingCart, IconUser } from "@tabler/icons-react"

export async function SectionCards() {
  const { totalSignups, totalCustomers, totalCourses, totalLessons } = await adminGetDashboardStat();

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Signups</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalSignups}
            </CardTitle>
          </div>
          <IconUser className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Registered users on TheLMS</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalCustomers}
            </CardTitle>
          </div>
          <IconShoppingCart className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Users who have enrolled in a course</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Courses</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalCourses}
            </CardTitle>
          </div>
          <IconBook2 className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total courses available on TheLMS</p>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="">
            <CardDescription>Total Lessons</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {totalLessons}
            </CardTitle>
          </div>
          <IconPlaylistX className="size-6 text-muted-foreground" />
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <p className="text-muted-foreground">Total lessons available on TheLMS</p>
        </CardFooter>
      </Card>
    </div>
  )
}
