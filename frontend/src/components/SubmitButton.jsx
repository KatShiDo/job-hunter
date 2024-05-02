import React from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "flowbite-react";

export default function SubmitButton(props) {
  const { loading } = useSelector((state) => state.user);
  return (
    <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
      {loading ? (
        <>
          <Spinner size="sm" />
          <span className="pl-3">Loading...</span>
        </>
      ) : (
        props.children
      )}
    </Button>
  );
}
