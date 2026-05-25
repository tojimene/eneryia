"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/dashboard/page-header";
import { SECTION_ASSETS } from "@/lib/mock-data";

const DEFAULT_METRICS = [
  { label: "Activos", value: "8" },
  { label: "En revisión", value: "3" },
  { label: "Publicados", value: "12" },
  { label: "Conversión", value: "4.3%" },
];

const STATUS_FILTERS = [
  { value: "all", label: "Todos" },
  { value: "Listo", label: "Listos" },
  { value: "En revisión", label: "En revisión" },
  { value: "En diseño", label: "En diseño" },
  { value: "Borrador", label: "Borradores" },
];

export function SectionPage({
  eyebrow,
  title,
  description,
  badges,
  metrics = DEFAULT_METRICS,
  items = SECTION_ASSETS,
  highlight,
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.owner.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [items, query, statusFilter]);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        badges={badges}
        action={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4" />
              IA assist
            </Button>
            <Button variant="neon" size="sm">
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </div>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs uppercase tracking-wider">
                {metric.label}
              </CardDescription>
              <CardTitle className="text-2xl neon-text">{metric.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      {highlight && (
        <Card className="neon-border">
          <CardContent className="flex flex-col gap-3 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
                Foco semanal
              </p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {highlight}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Ver hoja de ruta
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Trabajo en curso</CardTitle>
              <CardDescription>
                Filtrá por estado o buscá un asset concreto.
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por título, owner o ID…"
                  className="h-9 w-full pl-9 sm:w-72"
                />
              </div>

              <Button variant="ghost" size="sm" type="button">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>

          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="h-9">
              {STATUS_FILTERS.map((filter) => (
                <TabsTrigger
                  key={filter.value}
                  value={filter.value}
                  className="text-xs"
                >
                  {filter.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[110px]">ID</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead className="hidden md:table-cell">Owner</TableHead>
                <TableHead className="hidden lg:table-cell">Versión</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[180px]">Impacto</TableHead>
                <TableHead className="w-[60px] text-right">·</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    Sin resultados para los filtros actuales.
                  </TableCell>
                </TableRow>
              )}

              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs text-primary">
                    {item.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Actualizado {item.updatedAt}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.owner}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline">{item.tag}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.statusVariant ?? "neon"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={item.impact} />
                      <span className="text-[11px] text-muted-foreground">
                        {item.impact}/100
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalle</DropdownMenuItem>
                        <DropdownMenuItem>Duplicar</DropdownMenuItem>
                        <DropdownMenuItem>Mover a revisión</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Archivar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
