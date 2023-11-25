import { Button } from '@radix-ui/themes'
import { MdDelete } from "react-icons/md";


const DeleteIssueButton = ({issueId}: {issueId: number}) => {
  return (
    <Button color='red' >
        <MdDelete size={25} />
        Delete Issue
    </Button>
  )
}

export default DeleteIssueButton