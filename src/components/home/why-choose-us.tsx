import { Card, CardContent } from '@/components/ui/card'
import { WHY_CHOOSE_US } from '@/lib/constants'

export default function WhyChooseUs() {
  return (
    <section className="bg-secondary/30 py-12 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Our Platform?
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item, index) => (
              <Card key={index} className="border-none bg-background/60 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="mb-4 text-3xl">{item.icon}</div>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}