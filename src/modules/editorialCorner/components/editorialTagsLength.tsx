

type EditorialTagsLengthProps = {
  length: number;
};

const EditorialTagsLength = ({length}:EditorialTagsLengthProps) => {
  return (
    <div className="text-title-darkblue font-medium lg:text-sm text-sm ">
      +{length-2}
    </div>
  )
}

export default EditorialTagsLength;
