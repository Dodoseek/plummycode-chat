interface ListData {
    count: number,
    next: string,
    previous: string,
}

interface InfoTabs {
    value: string
    title: string,
}

interface TabObject {
    name: string,
    list: unknown[]
}

interface PropsUtilityData {
    width?: number,
    color?: string
    className?: string
}

type Links = {
    links: Link[]
}

type Link = {
    href: string,
    icon: React.ReactNode
}