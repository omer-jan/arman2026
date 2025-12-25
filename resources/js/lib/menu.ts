export interface MenuItem {
  title: string
  icon?: string // Lucide icon name
  key: string
  href?: string // Inertia/Laravel URL
  children?: MenuItem[]
}

// Sample enterprise menu config
export const menu: MenuItem[] = [
  {
    title: "HR",
    icon: "Users",
    key: "hr",
    children: [
      { title: "Positions", key: "positions", href: "/hr/positions" },
      { title: "Departments", key: "departments", href: "/hr/departments" },
      { title: "Users", key: "users", href: "/hr/users" },
      { title: "Payroll Sheet", key: "payroll", href: "/hr/payroll" },
      { title: "Leaves", key: "leaves", href: "/hr/leaves" },
      {
        title: "Reports",
        key: "hr-reports",
        children: [
          { title: "Salary Report", key: "salary-report", href: "/hr/reports/salary" },
          { title: "Leave Report", key: "leave-report", href: "/hr/reports/leave" }
        ]
      }
    ]
  },
  {
    title: "Sales",
    icon: "ShoppingCart",
    key: "sales",
    children: [
      { title: "Orders", key: "orders", href: "/sales/orders" },
      { title: "Distributors", key: "distributors", href: "/sales/distributors" },
      {
        title: "Reports",
        key: "sales-reports",
        children: [
          { title: "Distributor Report", key: "distributor-report", href: "/sales/reports/distributors" }
        ]
      }
    ]
  },
  {
    title: "Finance",
    icon: "Wallet",
    key: "finance",
    children: [
      { title: "Accounts", key: "accounts", href: "/finance/accounts" }
    ]
  }
]
