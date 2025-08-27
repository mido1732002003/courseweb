import { KEY_FEATURES } from '@/lib/constants'

export default function KeyFeatures() {
  return (
    <section className="container py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Platform Features
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Built for modern learners like you
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {KEY_FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-lg p-6 transition-all hover:bg-secondary/50"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}