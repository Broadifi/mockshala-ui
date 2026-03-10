

type EditorialTagsLengthProps = {
  length: number;
};

const EditorialTagsLength = ({length}:EditorialTagsLengthProps) => {
  return (
    <p className="text-title-darkblue font-medium lg:text-sm text-sm ">
      +{length-2}
    </p>
  )
}

export default EditorialTagsLength;
