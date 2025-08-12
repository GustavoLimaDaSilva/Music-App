import useStream from "../hooks/useStream";

export default function ContentButton({ tracks }) {

  const [toStream, setToStream] = useStream()

  return (
    <button className="content-actions-btn" onClick={() => {

      if (tracks) {
       
        setToStream(tracks)
      }
    }}>Play All</button>
  );
}

