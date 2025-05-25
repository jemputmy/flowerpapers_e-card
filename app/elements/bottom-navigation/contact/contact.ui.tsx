import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { contactConfig, ContactPerson } from "../../../config/config-app-environment";

export interface CalendarDrawerInterface {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDrawer({ open, onOpenChange }: CalendarDrawerInterface) {
  const { contacts, translations, styles } = contactConfig;

  const getAvatarUrl = (contact: ContactPerson) => {
    const options = contact.avatarOptions || {};
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}` +
      `&background=${options.background || 'random'}` +
      `&color=${options.color || 'fff'}` +
      `&size=${options.size || 128}`;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{translations.title}</DrawerTitle>
          <DrawerDescription>{translations.description}</DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="h-[300px] px-4 pb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <tbody>
                {contacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
                  >
                    <td className="px-2 py-4 sm:w-1/4">
                      <img
                        src={getAvatarUrl(contact)}
                        alt={contact.name}
                        className="w-16 h-16 rounded-full mx-auto mb-2"
                      />
                    </td>
                    <td className="px-2 py-2 sm:w-1/4 text-center sm:text-left">
                      <div className="text-gray-800 font-semibold">{contact.name}</div>
                      <div className="text-gray-500 text-sm">{contact.designation}</div>
                    </td>
                    <td className="px-4 py-2 sm:w-1/4 text-center sm:text-left">
                      <a href={`tel:${contact.phone}`} className={`${styles.callButton} inline-flex items-center gap-2`}>
                        <PhoneIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">{translations.callButtonText}</span>
                      </a>
                    </td>
                    <td className="px-4 py-2 sm:w-1/4 text-center sm:text-left">
                      <a
                        href={`https://wa.me/${contact.phone.replace("+", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.whatsappButton} inline-flex items-center gap-2`}
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        <span className="hidden sm:inline">{translations.whatsappButtonText}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </ScrollArea>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {translations.closeButtonText}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}