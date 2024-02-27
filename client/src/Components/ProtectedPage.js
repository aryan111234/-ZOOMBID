import React from "react";

function ProtectedPage() {
  const [user, setuser] = React.useState(null);

  const validateToken = async () => {
    try {
      const response = await GetCurrent();
      if (response.success) {
        setuser(response.success);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.eroor(error.message);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);
  return <div></div>;
}

export default ProtectedPage;
