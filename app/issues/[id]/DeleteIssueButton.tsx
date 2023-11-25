"use client";
import { Button, Flex, AlertDialog } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="hover:cursor-pointer">
          <MdDelete size={25} />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action can not be
          undone.
        </AlertDialog.Description>
        <Flex className="mt-4 gap-4">
          <AlertDialog.Cancel>
            <Button
              color="gray"
              variant="soft"
              className="hover:cursor-pointer"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              className="hover:cursor-pointer"
              onClick={async () => {
                await axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                router.refresh();
              }}
            >
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
