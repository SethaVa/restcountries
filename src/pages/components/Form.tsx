import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface CountryFormProps {
  initialData: any | null;
}

const formSchema = z.object({
  officialName: z.string(),
  cca2: z.string(),
  cca3: z.string(),
  nativeName: z.string(),
  altSpellings: z.string(),
  idd: z.string(),
});

export type CountryFormValues = z.infer<typeof formSchema>;
const CountryForm: React.FC<CountryFormProps> = ({ initialData }) => {
  const form = useForm<CountryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      officialName: "",
      cca2: "",
      cca3: "",
      nativeName: "",
      altSpellings: "",
      idd: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="officialName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Name</FormLabel>
              <FormControl>
                <Input className="rounded-md" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="cca2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2 character Country Code</FormLabel>
                <FormControl>
                  <Input className="rounded-md" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cca3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>3 character Country Code</FormLabel>
                <FormControl>
                  <Input className="rounded-md" readOnly {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nativeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Native Country Name</FormLabel>
              <FormControl>
                <Textarea className="resize-none" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="altSpellings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alternative Country Name</FormLabel>
              <FormControl>
                <Textarea className="resize-none" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Calling Codes</FormLabel>
              <FormControl>
                <Textarea className="resize-none" readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CountryForm;
