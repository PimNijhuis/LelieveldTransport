import React, { useState } from "react";
import SignaturePad from "react-signature-canvas";
import styles from "../styles/Signature.scss";

// ? afhankelijk wat michel met de handtekening wil is de bestaande signature service goed, anders check dit:
// ? ttps://www.reddit.com/r/reactjs/comments/cfpd8y/reactfriendly_digital_signature_service/ :
// ? https://www.npmjs.com/package/react-signature-canvas, but that just captures the signature -- and no additional data that could be used as proof that the person signing really did sign the document,

export default function Signature(props) {
  const [trimmedDataURL, setTrimmedDataURL] = useState("");
  var [sigPad, setSigPad] = useState({});

  const clear = () => {
    setSigPad({})
  }
  const trim = () => {
    setTrimmedDataURL(sigPad.getTrimmedCanvas().toDataURL("image/png"));
  };

  console.dir(sigPad);
  return (
    <div className={styles.container}>
      <div className={styles.sigContainer}>
        <SignaturePad
          canvasProps={{ className: styles.sigPad }}
          ref={(ref) => {
            sigPad = ref;
          }}
        />
      </div>
      <div>
        <button className={styles.buttons} onClick={clear}>
          Clear
        </button>
        <button className={styles.buttons} onClick={trim}>
          Trim { trimmedDataURL }
        </button>
      </div>
      {/* {trimmedDataURL ? (
        <img className={styles.sigImage} src={trimmedDataURL} />
      ) : null} */}
    </div>
  );
}
