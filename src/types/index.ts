export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type LandingConfig = {
  mainNav: MainNavItem[]
}

export type ReturnValue<T> = { data: T } | { error: string }

export type BikeStation = {
  name: string
  resource: string
}