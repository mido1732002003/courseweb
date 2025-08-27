import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/actions/auth.actions'
import AdminNav from '@/components/admin/admin-nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user || user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your platform content</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside>
          <AdminNav />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}