

type EditorialTagsLengthProps = {
  length: number;
};

const EditorialTagsLength = ({length}:EditorialTagsLengthProps) => {
  return (
    <div className="text-title-gradient-blue">
      +{length-2}
    </div>
  )
}

export default EditorialTagsLength;
