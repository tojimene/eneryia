import {
  ClipboardList,
  FileText,
  Megaphone,
  Filter,
  AlignLeft,
  Type,
  ImageIcon,
  Video,
  Send,
  GraduationCap,
  Globe,
  ShoppingCart,
  Mail,
  FileStack,
  ScrollText,
  Sparkles,
  TrendingUp,
  PlusSquare,
  LayoutDashboard,
} from "lucide-react";

export const navigation = [
  {
    label: "Cerebro",
    items: [
      {
        title: "Operaciones",
        icon: LayoutDashboard,
        href: "/dashboard/operaciones",
        badge: "Live",
      },
      {
        title: "Brief",
        icon: ClipboardList,
        href: "/dashboard",
        badge: "Core",
      },
    ],
  },
  {
    label: "Contenido",
    items: [
      {
        title: "Contenido",
        icon: FileText,
        children: [
          {
            title: "Largo",
            icon: AlignLeft,
            href: "/dashboard/contenido/largo",
          },
          {
            title: "Corto",
            icon: Type,
            href: "/dashboard/contenido/corto",
          },
        ],
      },
    ],
  },
  {
    label: "Publicidad",
    items: [
      {
        title: "Ads",
        icon: Megaphone,
        children: [
          {
            title: "Estáticos",
            icon: ImageIcon,
            href: "/dashboard/ads/estaticos",
          },
          {
            title: "Vídeos",
            icon: Video,
            children: [
              {
                title: "Of. Directa",
                icon: Send,
                href: "/dashboard/ads/videos/directa",
              },
              {
                title: "Of. Indirecta",
                icon: GraduationCap,
                href: "/dashboard/ads/videos/indirecta",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: "Conversión",
    items: [
      {
        title: "Funnels",
        icon: Filter,
        children: [
          {
            title: "Landings",
            icon: Globe,
            children: [
              {
                title: "Compra",
                icon: ShoppingCart,
                children: [
                  {
                    title: "Landing VSL",
                    icon: Sparkles,
                    href: "/dashboard/funnels/landings/compra/vsl",
                  },
                  {
                    title: "Dossier",
                    icon: FileStack,
                    href: "/dashboard/funnels/landings/compra/dossier",
                  },
                  {
                    title: "Largo",
                    icon: ScrollText,
                    href: "/dashboard/funnels/landings/compra/largo",
                  },
                ],
              },
              {
                title: "Optin",
                icon: Mail,
                children: [
                  {
                    title: "Landing VSL",
                    icon: Sparkles,
                    href: "/dashboard/funnels/landings/optin/vsl",
                  },
                  {
                    title: "Dossier",
                    icon: FileStack,
                    href: "/dashboard/funnels/landings/optin/dossier",
                  },
                  {
                    title: "Largo",
                    icon: ScrollText,
                    href: "/dashboard/funnels/landings/optin/largo",
                  },
                ],
              },
            ],
          },
          {
            title: "VSL Compra",
            icon: TrendingUp,
            children: [
              {
                title: "Upsell",
                icon: PlusSquare,
                href: "/dashboard/funnels/vsl-compra/upsell",
              },
              {
                title: "Bumps",
                icon: ShoppingCart,
                href: "/dashboard/funnels/vsl-compra/bumps",
              },
            ],
          },
        ],
      },
    ],
  },
];
