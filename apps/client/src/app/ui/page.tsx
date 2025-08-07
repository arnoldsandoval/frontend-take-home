"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Navigation, NavigationLink } from "@/components/ui/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { toast } from "sonner";

const ComponentSection = ({
  children,
  title,
  exampleClasses,
}: {
  children: React.ReactNode;
  title: string;
  exampleClasses?: string;
}) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div
        className={cn(
          "border border-dashed rounded-lg px-8 py-6",
          exampleClasses
        )}
      >
        {children}
      </div>
    </div>
  );
};

const SectionHeading = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Heading level={1}>{title}</Heading>
      <Text>{children}</Text>
    </div>
  );
};

export default function ComponentLibrary() {
  return (
    <div className="max-w-4xl mx-auto grid gap-12 px-8 py-8">
      <SectionHeading title="Foundation">
        The foundation represent the elemntal pieces of our design. They are
        composed of color, type, spacing, and can be used to create components
        or as standalone elements.
      </SectionHeading>

      <ComponentSection title="Color">TODO</ComponentSection>

      <ComponentSection title="Type" exampleClasses="space-y-4">
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>

        <div className="flex flex-col gap-4">
          <Callout>
            <Text>
              You can also use the visualLevel prop to override the visual
              appearance of the level in order to preserve the hierachy and
              semantics of your HTML document.
            </Text>
          </Callout>
          <Heading visualLevel={3} level={5}>
            Heading 3 (rendered as an h5)
          </Heading>
          <Heading visualLevel={4} level={6}>
            Heading 4 (rendered as an h6)
          </Heading>
        </div>
      </ComponentSection>

      <ComponentSection title="Spacing">TODO</ComponentSection>

      <SectionHeading title="Components">
        Components are the building blocks of our product user interfaces. They
        are designed and implemented to be composable by default allowing for
        maximum flexibility for downstream consuming apps. Several of these
        components were bootstrapped with{" "}
        <a href="https://ui.shadcn.com" target="_blank">
          shadcn/ui
        </a>{" "}
        and WorkOS&lsquo; own{" "}
        <a href="https://www.radix-ui.com" target="_blank">
          Radix UI
        </a>{" "}
        component library.
      </SectionHeading>
      <ComponentSection title="Avatar">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ComponentSection>

      <ComponentSection title="Badge">
        <div className="flex flex-col items-center gap-2">
          <div className="flex w-full flex-wrap gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex w-full flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600"
            >
              <BadgeCheckIcon />
              Verified
            </Badge>
            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
              8
            </Badge>
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="destructive"
            >
              99
            </Badge>
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="outline"
            >
              20+
            </Badge>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Button" exampleClasses="flex gap-2">
        <Button>Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="default">Loading</Button>
        <Button variant="secondary" size="icon" className="size-8">
          <ChevronRightIcon />
        </Button>
      </ComponentSection>

      <ComponentSection title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            Content
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      <ComponentSection title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>User options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem>Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentSection>

      <ComponentSection title="Input">
        <Input />
      </ComponentSection>

      <ComponentSection title="Sonner" exampleClasses="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            toast.success("Success");
          }}
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.error("Error");
          }}
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast.loading("Loading");
          }}
        >
          Loading
        </Button>
      </ComponentSection>

      <ComponentSection title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>
                <span className="sr-only">User modification options</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>First Last</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>2021-01-01</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronRightIcon />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ComponentSection>

      <ComponentSection title="Navigation">
        <Navigation>
          <NavigationLink label="Users" href="/users" />
          <NavigationLink label="Roles" href="/roles" />
        </Navigation>
      </ComponentSection>
    </div>
  );
}
