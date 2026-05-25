import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(function Table({ className, ...props }, ref) {
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
});

const TableHeader = React.forwardRef(function TableHeader({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b [&_tr]:border-border/60", className)}
      {...props}
    />
  );
});

const TableBody = React.forwardRef(function TableBody({ className, ...props }, ref) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
});

const TableFooter = React.forwardRef(function TableFooter({ className, ...props }, ref) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-border/60 bg-muted/40 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
});

const TableRow = React.forwardRef(function TableRow({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border/40 transition-colors hover:bg-primary/5 data-[state=selected]:bg-primary/10",
        className
      )}
      {...props}
    />
  );
});

const TableHead = React.forwardRef(function TableHead({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-11 px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});

const TableCell = React.forwardRef(function TableCell({ className, ...props }, ref) {
  return (
    <td
      ref={ref}
      className={cn("p-4 align-middle text-sm text-foreground/90", className)}
      {...props}
    />
  );
});

const TableCaption = React.forwardRef(function TableCaption({ className, ...props }, ref) {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
