export default function Map({ findLocation }) {
  const handleClick = (e) => {
    findLocation(e);
    console.log(e.target.id);
  };

  return (
    <>
      <svg
        className="svg-map-image"
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        width={300}
        height={587}
        preserveAspectRatio="xMidYMid meet"
        onClick={handleClick}
        style={{ fill: "lightgray", stroke: "black" }}
      >
        <path
          className="individual-districts"
          id="Aveiro"
          d="m90.5 129.6l3.3-1.1 0.3 1.9 3.8-0.8 2.4-2.8 1.2 2.8 1.7 0.6 0.2-1.4 2.2-0.8-2.2-1.1 0.5-1.5 2.5 1.2 0.7-1.2 1.5 3.4 3.5 2.4 0.5-2.4-1.5-1.1 0.2-2.2 4.3 1.3 4.5-4.4 2.6 1.6 2.3 0.9 0.5 3.4-0.9 0.2 0.6 1.5 2.5 0.2-0.7 1.8 1.6-0.4 5.1 2.1 2.9-3.8 0.7 0.5 0.2 2.4-3.7 4.4 0.4 5.5 2.1 3.5-2.2 2-3.2-1.9-2 2.2-3.4-2-2 0.9 1.5 3.5-3 7.6-5.1 1.9 0.5 3.2 2.5 2 0.2 6.5 4.2 2-5.4 2.3 2 6.3 3 3.2-7.3 2.7 1.5 5-3.1 3.6-0.1 4.6-0.2 2.2-1.4 0.7-2.5-1.2-0.4 3.1-3.3 0.7-0.5 4.2-2.9-1.4-3 0.2-0.5-2.8h3.8l0.3-7.8-2-1.5v-2.5l-5.7 2.4-0.2-7.1-0.8-1.6-2.6-0.7-1.4 2.2-0.3 4.3-2.4-0.2-3.3-3.4-6.9-6.8 2.7-11.3 0.2-2-1.2-0.4 6.9-23z"
        />
        <path
          className="individual-districts"
          id="Beja"
          d="m131.1 424.9l1.1-1 1.7 1.8 6.5-1.7 3.8 3.1 2.4-2 12 7.1 6.8 0.6 7.6 5 2.9-1 3.9 0.6 1.8 1.6h5.9l0.2-1.9 2.7-1.1 2.2-2.8 0.4-1.9 2-0.7 1-2.5-0.8-0.9 4.3-0.1 1.6-2.3 4.2-1.1 3.7 7.3 4.5 1.8-0.7 2.4 3.3 6.9 0.8 0.3-0.2-1.8 1.9 0.2 1.9-1.7 2 2 1.5-1.9 0.6 1 2.6-0.5 1.5-2.4 2.6-0.7 0.7 1 3-2 0.2 2-3 3.8 1.4 1.5-1.5 4.5-1.5 0.9-1.2 8.5-3.7 0.9-4.4-3.2-2.5 1.6 0.6 2.6-4.4 1.3-2.5-1.1-5.1 2.5 1.2 2.7-0.6 3.4-2.3 2.7-0.1 3-3.4 5.7-6.1 5.5-2.1 0.6-2.3 6.5 0.4 3.5-1 0.3 0.1 1.6-1.1-0.3-1.8 4.9-1.3-0.1-0.3 5.1-1.3 0.1 0.9 3.1-5.3-0.3-3.7 4-4.8-1.5-6.6 2.8-1-0.9 0.1 0.9-4.1 2.5-0.9-0.7-0.8 1.5-1.7-0.1-0.3 1.3-3 0.3 0.1 2-1-0.2-0.5 1.4-1.4-1-1.3 1.1-3.6-0.4-2 3.1 1.3 1.6-3.1 0.8-3.2 3.8-10.4-2.4-5.1-4.6-2.2-0.2 0.8-2.2-1.1-1.8-3.5-1.5-0.8 1.7-0.7-1.1-6.8 1.5-0.4 2.7-2.4 1.8-5.4-0.2-4.7-3.5-3.9 1-2 2.8-2.1-2.7-5.8 0.6-1.4-3.9-3.9-1.1 0.9-9.6-2.9-7 2.8-12.2-2.2-3.8 1.6-7.5 1.5 1.6 3.4-1.1 4.4 6.5 1.9-1.6 3.7 2.1 0.9-1.2 1.7 0.4 0.2-4.6 1.5-2 1.5 0.3-0.2-3.4 1.2-0.6 8.2-0.7 0.5-1.2 8.7 2.6-0.3-2.1 3-3.5-0.8-1.3 1.3-8.8-2.2-3.5-3.8 0.5-3.8-5.5 1.7-4.5 2.2 1.2 0.6-3.7 1.5-0.3 0.4-1.5 1.9 1.8 1.7-0.1 0.6-5.1 3.7 0.8 1.7-2.5 7.6-2.3 0.1-4.5z"
        />
        <path
          className="individual-districts"
          id="Braga"
          d="m140.7 39.2l-0.9 6.7-2.2 5.4-2.7 2.6 7-1.3 4.1 1.8-0.7 9.2 9.8 1.7 2.5-3 3.4 4.7-0.8 1.9-1.6 0.4 0.2 1.9-2.3 1.3 0.2 1.4-2.7-0.2-0.7 2.8-3 1.3-0.3 5.3-3.4 4 1.2 0.3-0.6 1.9-1.2 3.1-3.6 3.2-2.9-2.7-1.8 1.6-2.8-1.6-2.3-1.9 0.6-2-1.6-0.4-0.6-2.1-4-1.3-0.8 2h-2l-2.7 2.8-0.8 3.1-2.4-1.1-0.8-2.9-5.8 1.7 0.8-2.1-1.3-0.4-2.7 2.4-2-1.4-3.9 0.8-1.4 2.5-7.8 0.5-1.1-4.6 1.1-1 1.7-1-1.3-1.4-3.8-0.8-1.6-2.9-2.7 0.4-3.8-3-2.5-0.3-2.9-15.9 4.5-0.2 5.1-3 2.7-0.2 1.1 1.3 0.7-2.7 3.3 2.3 2.3-0.9 1.2 2.1 1.9-0.8-0.6-3.6 2.2-1.9 0.3-5.2 1.4-1.4 1.2-0.2 0.1 1.4 2.1-0.5 3.1-2.9 4.2-1.4 2.1 1.1 3.7-0.1 1-2.2 1.9 1.1 6.4-4.7 2.5 0.6 0.2-1.3 6 1.2z"
        />
        <path
          className="individual-districts"
          id="Bragança"
          d="m246.5 20l2.7 0.6 1.5 4.5 2 0.8 8.9-0.3 2.9-3.2 3.2 2.6-1.8 6.9 4.7 1.4-2.4 10.6-2.1 3.9 1.1 0.7 1.2 6.4 3.6 2.6 3.5-1 1.1-2.1 12 2.6 4.1 3.3 1.6 2.9 2.9 1.4 1 2.2-4 6.1-1.8 0.8 0.6 1.5-1.3 0.3 0.4 1.3-1.9 0.8-1.8 3.3 0.4 2.4-2.8 2 1.3 2.8-2.9 0.9-1.2-1.8-2 1-0.3 1.7 1.4 1.2-3.2 1.3-1.9 4.8-4.2 1.5 0.7 1.8-1.5 1.1-2.2-1.1-4.1 4.1-1.7-1.8-0.7 1.3-4.1-0.5-3.7 4.3-1.5 4.1-5 4.3 1.2 3.4-4.6 7.6-5.1 1-4-1.3-1.3 1.1-3.2-0.8-1.9 1.2-0.5-1.3-3.9-0.8-1.2-2.1-3.7-1.9v-2.7l1.5-2.4-3.9-1.3 1.3-1.5-0.2-3.2-3.9 5.9-7.3-2.1-4.6 0.6-4.5-0.9-2.8-5.3-3.5-1.7 1.5-4.3 2.2 0.5-0.3-4.7 2.5-2-1.1-1.2 1.6-1.9 3.5-0.8-4-2.9 0.8-1.4-1.2-4.3 0.1-2.8 5.7-2.7-0.3-2.6 1.5-3.2 4.6-0.8-2.5-4.6v-3.1l4.3-13.7 3.1-3.6v-2.9l-1.9-1.4-1.4-3.6 0.8-7.4 2.4-4.5-1.4-2.5 0.3-3.5 3.8-2.1 4.5 2 1.3 2.6h5.6l2.3-2.7 1.8 0.6 1.1 2.7 4.4 0.6 6-0.7 0.9-5.3z"
        />
        <path
          className="individual-districts"
          id="Castelo Branco"
          d="m163.4 216.9l4.1-0.8 2.1-2.6 4.5-1.5 3.2-2.8 0.8-2.7 2.4 1.4 3.7-0.7 1.8-5.7 2.4-2.9 2.1-0.7 1.3 1.6 1.8-0.5 2.7 1.2 2.9-1.3 1.2 1.2 1.5-3.2 1.8 0.8 1.1-1.4 1.9 0.9-0.2 6.7-2.8 4.8-2.2 1.1 1.1 1.5 6.7 2.4 2.3-3 4.4 1.9 2.1-1.6 0.5-3.2 1.5-1.4 2.4 5.1h4.5l1.4-1.3 5.3 3.6-1 2.2-4.2 1.4-1.4 4.3 1.1 1.1-0.4 3.6 2.4 3.4h4.4l2 5.2 2.1 0.6 2.4 5.3-1.9 3.6 0.2 4.3-1.9 1.8 0.3 5.9-3.8 4.7-3.3 1.9 0.9 4.1-3.3 11.2-11.5 1.9-8.5-1.5-6.9 2.9-10.3-2.4-7.3-0.1-3.5 0.6-4.6 3.8-2.9-2.8-2.7 1.3-1.6 4.8-2.8 0.5-1.2 2.6-4.7 3 1.3-3.6-1.1-2.1-3.5-5.4-2.4-0.5-1.9-2.8-3.6 0.8 0.4-6.1-1.4-3.1-1.8 1.9-1.3-1.7-2.6-0.5-1.5 1.4-0.3 6.9-1.6 1.5 1.9 4.5-6.8 0.7-8.6-3.7 0.6-11.9-1.1-2.8-1.9 1.1-1.7-2.8v-0.1l-0.7-1.4 1.8-1.2-0.3-2.5 4.1-1.5 1.5 0.5 2-3.3 1.5 0.6 1.6-1.1 2.6-5.3 0.3-1.6 2.7 0.2-0.3-2 1.7 1.1 0.8-1.6 2 1 0.2-2.7 1.2 1.5 1-0.1-0.7-1.9 1.3 1.2 1.7-1.2 1.2 1.3 0.9-2.7 4.3-0.1-1.2-3.3 4.4-2.8 3.3 0.8 1.4 1.7 0.2-3.8 0.8-0.8-1.7 0.1 2.5-1 1.2 2.4 2.6-3.1-0.8-0.9 1.7-0.6-0.4-2.1-5.1-4-1-2.3z"
        />
        <path
          className="individual-districts"
          id="Coimbra"
          d="m78.7 184.7l7 6.8 3.3 3.4 2.3 0.3 0.3-4.4 1.4-2.2 2.6 0.7 0.8 1.6 0.2 7.2 5.7-2.5v2.5l2 1.6-0.3 7.7h-3.8l0.5 2.8 3-0.2 2.9 1.5 0.5-4.3 3.3-0.7 0.4-3.1 2.5 1.2 1.4-0.7 0.2-2.2 1.1-0.3 1.2 1.7 2.5-0.4 4.1 3.9 4.9-2.2 0.7 1 1.2-1.2 3.1 1.3 7.7-5.8 5.8-2.2 7.6-7.5 4.7-2.8 0.1 1.8 2.6 2.7-1.2 2-3.1 1.2 0.2 1.6 1.6 1.2 2.5-0.2-0.7 6.2 4 1.9-0.6 1.7-3.3 1-1.9 4.6 3.7 4-2.2 5.3 1 2.3 5.1 4 0.4 2.1-1.7 0.6 0.8 0.9-2.6 3.1-1.2-2.4-2.5 1 1.7-0.1-0.8 0.8-0.2 3.8-1.4-1.7-3.3-0.8-4.4 2.8 1.2 3.3-4.3 0.1-0.9 2.7-1.2-1.3-1.7 1.2-1.3-1.2 0.7 1.9-1 0.1-1.2-1.5-0.2 2.7-2-1-0.8 1.6-1.7-1.1 0.3 2-2.7-0.2-0.3 1.6-1.2-0.7 1.9-3.4-3.9-5.6 1.1-5.6-3-1.8-2.6 4.1-2.8-1.7-2.8 2.4-1.9 4 2.3 2.2-0.7 3.3-2.9-3.2-5.1 7.1-3-0.9 2.5-2.6-3.9-7.8-0.9 1.2 0.8 2-2.6-2.2-2.8 3.5-2.7 0.1-1.3 4-2-8.8-2.5 0.1-2 3.9-2.4 0.2 0.2-2.3-2.9-2.1-7.7-1.2-2.9 3.2-3.3-1.8-2.5 0.6-2.1-2.4 2.7-10.2-4-5.5 5.5-15.9z"
        />
        <path
          className="individual-districts"
          id="Évora"
          d="m125.8 352.9l0.7 1 3.7-4.6 1 0.6 1-1.3 1.6 1.6 0.2-1.2h2.2l0.5 1.1-1.9 1 1.5 3.8 1.3-0.8 0.1-3.3 1.4-1 4.8 3.7-0.8 4.4 3-0.4 5.3-3.3 2.5 4.7 1.5 0.6 0.1 1.9 7.3 1.4 0.4-1.2 2.8-0.2 1.6-3.3 3 2.9 1.2-1.9 3.9 2 2.8-4.6 3.3 0.1 1.9-1.6-0.9-2.7 1.7-1.7 1.7 2.4 2.4-0.2-0.3 1.4 3 1.2-1.1 4.1 3.6 2.5-0.4 2.8 2 3.1-1.7 0.1 1.6 1.2 1.2 3.8 2-1.1 1.1 1.5 2.3-0.7 0.2-2.3 1.6-0.5 1-1.1 1.3 1.4 2.9-2.2 1.6 2.1 1.6-0.3-2.2 5.2 2.5 3.4-4.8 3-1 9.2 2.4 1.6-6 11.8-0.6 3.9 1.8-0.5 0.1 1.4-3.1 3.7 1.6-0.5 3.2 2.2 0.6 2.7 8.6 12.4 1.7 0.4 3.6 9.4-1.9 1.7-1.9-0.2 0.2 1.8-0.8-0.3-3.3-6.9 0.7-2.4-4.5-1.8-3.7-7.3-4.2 1.1-1.6 2.3-4.3 0.1 0.8 0.9-1 2.5-2 0.7-0.4 1.9-2.2 2.8-2.7 1.1-0.2 1.9h-5.9l-1.8-1.6-3.9-0.6-2.9 1-7.6-5-6.8-0.6-12-7.1-2.4 2-3.8-3.1-6.5 1.7-1.7-1.8-1.1 1-2.8-2.4-6.1-1.2-0.6-1.9-3.9-0.1 3.3-4.3-1.5-1.3 1.5-0.2-0.6-1.4-2.7 0.2 1.1-2.3-5-9.4-4.6 2.7-1.9-0.7-2.5 1.1-2.5-3.3-1.3 0.5 1.2 2.6-1.9 0.8-0.3-1.8-3.4-0.4-0.2-1.7-5.4-0.2-1.2-6.7 12.8-11.2-0.8-2.2 1.7-2.8-4.7-0.2 3.9-4.7 2.5 1.3 3.4-4.2 1-0.4 0.8 1.6 2.7-3.7 3 2 1.8-2.2 0.9 1.5 0.8-2.5 3.4 2.7-0.6 0.9 1.4 1.7 2.4-1.1 2.1 2.3-0.6 0.9 2.6-0.1-0.3 1.3 3 1.7 1.4-3.3-2.1-1.8-0.8 1.4-0.5-2.3-1.8-1 2.4-3.1-2-1.4-2.2 0.5-0.2-1.1-5.2-2.5 2.5-3.3v-3.8z"
        />
        <path
          className="individual-districts"
          id="Faro"
          fillRule="evenodd"
          d="m159.8 565l1.5 0.3-5.3 4.1 1.3-2.7zm-10-0.2l6.1 4.5-4.6-0.6-4.5-3.4zm-24.5-8.1l-5.6 1.2-5.7-3.1-6 1.7-8.4-3.5-6.8-0.5-4.1 1.7-0.2 3-5.1-0.8-5.1 2.5-4.4 0.2-2 2-2.6-0.1-4.5 5.2-1.4-3.4-2.8 0.3 7.9-15.1-1.2-3.3 1.9-1.1 3-6.6-1.5-5.5 2.8-3.3 4.1-9.7 3.9 1.2 1.4 3.9 5.8-0.6 2.1 2.7 2-2.8 3.9-1 4.6 3.5 5.4 0.2 2.5-1.8 0.3-2.7 6.9-1.5 0.7 1.1 0.7-1.7 3.6 1.5 1.1 1.8-0.9 2.2 2.3 0.2 5.1 4.6 10.3 2.4 3.3-3.8 3.1-0.9-1.4-1.5 2.1-3.1 3.6 0.3 1.3-1 1.4 1 0.5-1.4 1 0.2-0.1-2 3-0.3 0.3-1.3 1.7 0.1 0.8-1.5 0.9 0.7 4.2-2.4-0.2-0.9 1 0.8 6.6-2.8 4.8 1.5 3.8-3.9 5.2 0.2 1.7 0.5 0.7 2.5 1.7 1.2-0.4 2 2 5.2-1.5 1.1 1.9 1.9-0.1 8.5 1.7 3.9-1 2.5 1.7 2.7 0.5 5.7-4.4-0.6-8.6 2.7-19.7 14.4-2.7-1.3-3.7 2.2v2.3l-1.3 0.4-4.7-3-3.6 0.6-10.8-7-6.1-2.1zm35 6.4l1 1-4.4 1.2z"
        />
        <path
          className="individual-districts"
          id="Guarda"
          fillRule="evenodd"
          d="m203.9 115.7l4.6-0.6 7.3 2.1 3.9-5.9 0.2 3.2-1.3 1.5 3.9 1.3-1.5 2.4v2.7l3.7 1.9 1.2 2.1 3.9 0.9 0.5 1.3 2-1.3 3.1 0.8 0.9 3 5.2 5.9 0.9 5.2 3.4 2.3 0.6 2.4v1.7l-2.1 0.6 0.9 4.8-1.2 5 3.1 10.2-4.3 10.5 3.7 1.8 0.5 4.3-4.6 6.6 1.3 4.9 4.5 4.8-1.1 4-5.7 3.2-0.8 4.1-6.8 0.5-5.3-3.6-1.4 1.3h-4.5l-2.3-5.1-1.7 1.4-0.4 3.2-2.2 1.6-4.3-1.9-2.3 3-6.7-2.5-1.1-1.4 2.2-1.2 2.8-4.8 0.2-6.7-1.9-0.8-1.1 1.4-1.8-0.8-1.5 3.1-1.2-1.1-3 1.3-2.6-1.3-1.8 0.6-1.2-1.7-2.2 0.8-2.3 2.9-1.9 5.6-3.7 0.7-2.3-1.4-0.9 2.7-3.1 2.9-4.6 1.4-2 2.6-4.2 0.8-3.6-3.9 1.8-4.7 3.3-0.9 0.6-1.7-4-1.9 0.7-6.2-2.5 0.2-1.6-1.2-0.2-1.6 3.1-1.2 1.2-2-2.6-2.7v-1.9l13.7-6.7 7.2-1.6-0.7-1.3 1.9-6.6 2.1-1.6-0.8-2 1.3-1.4-4.7-2.7-0.5-1.6 2.2-2.3-4.8-3.6 3.6-7.9 2.1-2.2 4 0.3 5.1 6.4 4.2-7.4 2 1.1 0.5-4.9 3.2-2.4 1-4.2-4.6-2.2v-2.5l3.5-0.1-0.7-3.6zm-9.6 24.4l3.3 2.3-1.6 2.3-2.7-1.6z"
        />
        <path
          className="individual-districts"
          id="Leiria"
          d="m87 288.4l1.3 1.7-2.1 3.4-1.6 1.3-1.6-1.7-1.1 0.8 1.5 5.3-6.2-0.3-8.6 1.9-3.5 8.1-2-0.3-1.8 1.9-0.3 8.7-2.7 0.4-1.1-1.8h-2.3l-0.5 1.1-3.1 2.6-2.9 5.1-2.9 1.9-2.1-3.9 1.3-2.3-1.1-3.7-3.8-0.3-0.9-1.3-3.5 3.7-3.7-0.9-2.1-6.3-3.7-1.1 1.1-1.2 4.2 0.8 8.9-6.8 2.5 2-0.9 0.7 3.3-0.1-1.5-0.2-2.2-3.5 4.8-7.1 2.9-0.4-0.7-1.9 5.8-7.2 0.2-1.6-1.1-0.2 3.1-12.7 13.2-35.6 2.2 2.3 2.4-0.6 3.4 1.8 2.8-3.1 7.7 1.2 2.9 2-0.1 2.3 2.4-0.2 1.9-3.9h2.6l1.9 8.7 1.4-3.9 2.7-0.2 2.8-3.5 2.5 2.3-0.8-2 0.9-1.2 3.9 7.8-2.4 2.6 3 0.9 5-7.1 2.9 3.2 0.8-3.3-2.3-2.2 1.9-4 2.8-2.4 2.8 1.7 2.6-4.1 3 1.8-1.1 5.6 3.9 5.6-1.9 3.5 1.2 0.6-2.6 5.4-1.6 1.1-1.5-0.7-2 3.4-1.5-0.6-4 1.5 0.2 2.5-1.7 1.2 0.6 1.4-4-0.7 0.3 4.5-1.3-1.4-3 2.5-2-0.9-4.1 3.2-2.1-11.8-2.4 2.5-1.2-1.4-1.8 2.9-4.4 2.7-3.5-1.4-3.5 1.8-0.4 3 1.4 2.3-1.2 1.8 3.8 1.6-1.3 3.7-4.5 2.5z"
        />
        <path
          className="individual-districts"
          id="Lisboa"
          d="m48.2 383.4l-6 1.5-5.5-0.8-3.6 2.8-5.8-3.1-2.9 1.3-5.1-2 1.2-4.5-2.4-3.3 7-17.6 0.7 0.5-1.5-6.9 0.5-7.9 6.4-13.9 0.4-9.7 3.8 0.9 3.5-3.7 0.8 1.4 3.8 0.3 1.2 3.6-1.3 2.3 2.1 4 2.9-1.9 2.9-5.1 3.1-2.6 0.5-1.1 2.3-0.1 1.1 1.9 2.7-0.4 1.6 1.1-0.5 4 1.6-0.6 4.3 2.2 3.1-1.7 1.1 2.2 2.5 0.8 0.5 4.1-4.5-0.1-2.8 1.6 3.9 4.7 5.8 3.5 1.4 4.2-3.5 3.3-3.1-0.1 1.6 1.3-3 5.1 2.2 0.7-3.4 2-1.7 6.1-4.9 6.7-1.8-2.8 1-1.6-1.4-1.8v-6.2l-2.1 5.7-5.5 7.4-1.5 9.5z"
        />
        <path
          className="individual-districts"
          id="Portalegre"
          d="m184.2 279.4l3.2 7.9 3.2 1.8 2.6 4.2 3.4 0.5 0.7 4.2 1.7 1.1 1.2-0.7 4.5 3.4-2.4 8.2 1.3 4.9 6.4 6.3-1.4 2.7 0.6 5 2.8 2.3 6.2 1.7-0.8 6.8 3.3 1 6.1-1.9 4.4 3.2 1.8 3.6-0.7 1.6 1.5 1.7-8.6 12.7 1.6 3-0.5 1.6-2.5 1.1-2.3 4.1-3.8 1.1-5.3 5.9-2.5-3.4 2.2-5.2-1.6 0.3-1.6-2.1-2.9 2.2-1.3-1.4-1 1.1-1.6 0.5-0.2 2.3-2.3 0.7-1.1-1.5-2 1.1-1.2-3.8-1.6-1.2 1.7-0.1-2-3.1 0.4-2.8-3.6-2.5 1.1-4.1-3-1.2 0.3-1.4-2.4 0.2-1.7-2.4-1.7 1.7 0.9 2.7-1.9 1.6-3.3-0.1-2.8 4.6-3.9-2-1.2 1.9-3-2.9-1.6 3.3-2.8 0.2-0.4 1.2-7.3-1.4-0.1-1.9-1.5-0.6-2.5-4.7-5.3 3.3-3 0.4 0.8-4.4-4.8-3.7-1.4 1-0.1 3.3-1.3 0.8-1.5-3.8 1.9-1-0.5-1.1h-2.2l-0.2 1.2-1.6-1.6-1 1.3-1-0.6-3.7 4.6-0.7-1v-1.9l-1.9 0.1-1.5-5.1-2-0.9v-2.3l-3.7-1.6-0.7-1.6 3.8-5.8 5.1-2 4.4-4 2.9-3.5-0.3-1.9 1.7-2 4.8 0.9 4.4-6.9-0.3-2.5 5.2-2 2.5-3-4.6-4.1-1.3-2.8 4.5-10 8.8 5.9 2.2-2.9 4.7-3 1.2-2.6 2.8-0.5 1.6-4.8 2.7-1.3 2.9 2.8 4.6-3.8 3.5-0.6z"
        />
        <path
          className="individual-districts"
          id="Porto"
          d="m86.6 112.4l-2.2-3.9-1.9-14.4-4-9.3 1-6.3 2.5 0.3 3.8 3 2.6-0.4 1.6 2.9 3.9 0.8 1.2 1.4-1.7 1-1.1 1 1.1 4.7 7.8-0.5 1.4-2.6 3.9-0.8 2.1 1.4 2.7-2.4 1.2 0.4-0.8 2.2 5.8-1.7 0.8 2.8 2.4 1.2 0.8-3.2 2.7-2.8 2 0.1 0.8-2.1 4 1.3 0.6 2.2 1.6 0.4-0.6 1.9 2.3 2 2.8 1.5 1.8-1.5 2.9 2.7 3.6-3.2 1.3-3.1 0.1 1.6 2.1 0.9-1.4 2.6 4.8 3-1.1 1.4 0.4 2 3.4 3.4-3.1 13.7-3.3-0.3-8.6 3.7-3.6-1.3-3.4 1.9-5.8-1.1-5 3.1-2.6-1.5-4.5 4.4-4.3-1.3-0.2 2.2 1.5 1.1-0.5 2.4-3.5-2.4-1.6-3.4-0.6 1.2-2.5-1.2-0.6 1.5 2.2 1.1-2.1 0.9-0.2 1.3-1.8-0.6-1.1-2.8-2.4 2.8-3.7 0.8-0.4-1.9-3.3 1.1-2-13.9z"
        />
        <path
          className="individual-districts"
          id="Santarém"
          d="m60.9 319.2l0.3-8.7 1.9-1.9 1.9 0.3 3.6-8.1 8.5-1.9 6.2 0.3-1.4-5.3 1.1-0.8 1.6 1.7 3.6-4.6-2.6-8.3 4.5-2.4 1.3-3.7-3.8-1.6 1.2-1.8-1.3-2.4 0.3-2.9 3.5-1.8 3.6 1.4 4.3-2.7 1.9-2.9 1.1 1.4 2.5-2.5 2 11.8 4.2-3.2 2 0.9 2.9-2.5 1.4 1.4-0.3-4.5 4 0.8 0.1 0.1 1.6 2.8 1.9-1.1 1.2 2.8-0.6 11.9 8.6 3.7 6.7-0.6-1.8-4.6 1.6-1.4 0.2-7 1.5-1.3 2.6 0.4 1.4 1.7 1.7-1.9 1.4 3.2-0.3 6.1 3.6-0.8 1.9 2.7 2.3 0.6 3.6 5.4 1 2-1.2 3.6-2.2 2.9-8.9-5.9-4.5 10 1.3 2.8 4.6 4.1-2.5 2.9-5.2 2.1 0.3 2.5-4.4 6.9-4.8-0.9-1.7 2 0.4 1.9-2.9 3.5-4.4 4-5.1 2-3.8 5.7 0.7 1.7 3.7 1.6v2.3l2 0.9 1.5 5.1 1.9-0.1v1.9l-1.3 1.5v3.8l-2.5 3.3 5.3 2.5 0.2 1.1 2.2-0.5 2 1.4-2.5 3.1 1.8 1 0.5 2.4 0.9-1.5 2.1 1.8-1.4 3.3-3.1-1.7 0.4-1.3-2.7 0.2 0.7-1-2.2-2.3-2.4 1.2-1.3-1.8 0.5-0.9-3.4-2.6-0.8 2.5-0.9-1.6-1.7 2.2-3.1-1.9-2.7 3.6-0.8-1.6-1 0.4-3.4 4.3-2.5-1.4-3.9 4.8-5.6-2.1 1.4-6.3-2.8 1.1-0.8 2.3-5.8-3.8-3.9 11.1-3.2 0.9-4-3-4.6 2.2-1-0.5-0.2 1.1-1.6-2.5-1.6-2 1.2-0.7-0.4-2.1-2.8-2.4 4.9-6.7 1.6-6.1 3.5-2-2.3-0.8 3.1-5.1-1.6-1.2h3.1l3.5-3.3-1.4-4.1-5.8-3.5-3.9-4.7 2.8-1.6 4.6 0.1-0.6-4.1-2.5-0.8-1.1-2.2-3.1 1.7-4.3-2.2-1.5 0.6 0.5-4.1z"
        />
        <path
          className="individual-districts"
          id="Setúbal"
          d="m79.1 414l9.1 0.3-2.4-2.6-1.8 0.2v-8l-1.5-0.8-0.3-4-1.7 3.5-2.2-1.7 0.6 3.1-2.5 0.5 4.6 0.5 0.1 2-2 1.5-1.6 0.4 0.3-1.8-8.8-3.7-2.6 1.2-0.4 2.2-4 1-4 3.6-3 1.2-3.7-0.9-2.2 1.5-3-0.1-2.3 2.2-2.3-0.5 3.5-9.9 3.2-2-3.2 0.8-2.5-9.6-4.3-6.2 9.8-2.7v2.4l3.9 1.8-2.2-0.3 1.8 3.4-0.2-2.4 2.1-0.2 2.7 4.4-1.2-4.8-2.2-1.2 4.2-2.1 0.3 1.9 1.5-1 2.2 2.1-1.3-3.4 3.4-1.9h-5.3l-1.4 1.2 0.4-2.8 6.9-4.5 3.1-0.3 1.6 2.5 0.3-1.1 1 0.6 4.5-2.2 4 3 3.2-0.9 3.9-11.1 5.8 3.9 0.8-2.3 2.8-1.1-1.4 6.2 5.6 2.1 4.7 0.3-1.7 2.7 0.9 2.2-12.9 11.2 1.2 6.8 5.4 0.1 0.2 1.8 3.4 0.4 0.3 1.8 1.9-0.9-1.1-2.5 1.3-0.5 2.4 3.3 2.6-1.1 1.9 0.7 4.5-2.7 5 9.4-1.1 2.3 2.7-0.2 0.7 1.4-1.6 0.2 1.6 1.3-3.3 4.3 3.8 0.1 0.7 1.9 6.1 1.2 2.8 2.4 2.9 5.8v4.5l-7.6 2.3-1.7 2.5-3.7-0.8-0.6 5.1h-1.8l-1.9-1.8-0.4 1.5-1.4 0.3-0.7 3.7-2.2-1.2-1.7 4.5 3.9 5.5 3.8-0.5 2.1 3.5-1.3 8.8 0.8 1.3-3 3.5 0.4 2.1-8.8-2.6-0.5 1.2-8.2 0.7-1.2 0.6 0.2 3.4-1.5-0.3-1.5 2-0.2 4.6-1.7-0.4-0.9 1.2-3.7-2-1.9 1.6-4.4-6.6-3.4 1.1-1.4-1.6-1.3-11.6-3.8-0.8-1.2-2-1.8 0.2 4.3-7.4 4.1-13.3 1.2-10-0.8-10.6-3.5-9-6.9-7.7 7 5.2 2.2 6-0.7-5.7z"
        />
        <path
          className="individual-districts"
          id="Viana do Castelo"
          d="m128.8 2.5l0.8 8.9 5.4-2 1.8 1.1 1.2 5-0.9 1.9-2.9 0.7-3 2.6-4.5 7.9 1.4 4.4 2.6-0.2 0.4 6.5-0.2 1.3-2.5-0.6-6.4 4.7-1.9-1.1-1 2.2-3.7 0.1-2.1-1.1-4.2 1.4-3.1 2.9-2.1 0.5-0.1-1.4-1.2 0.2-1.4 1.4-0.3 5.2-2.2 1.9 0.6 3.6-1.9 0.8-1.2-2.1-2.3 0.9-3.3-2.3-0.7 2.7-1.1-1.3-2.7 0.2-5.1 3-4.5 0.2-1.3-6.6-1.2-1.5-0.4 1.2-3.1-8.6 0.5-5.4 1.3-1.5-1.2-1.2 0.1-5.5 4.6-4.7 5.2-2.5 1.1-3.7 6.9-4.1 0.4-3.2 1.8-2 7.6-0.7 2.3-2.9 6.4-0.3 1.2 1.1 4-0.4 1.6-1.6 2.6 0.7 1.3-2.3 5-2 0.4-1.7 2.5 0.4 2.1-2.4z"
        />
        <path
          className="individual-districts"
          id="Vila Real"
          d="m153 27l1.8 0.3-0.7 7.4 1.7 1.6 2.6-2.4-0.3-1.7 4.5-0.2 2.4-1.8 2.6 0.8 2.7-1.8 4 3 5.7-0.1-2.1 6 7.6-1.4 1.6-3.1 4.2 0.4 0.8 3 1.5 1-0.2 2.6 5.3-5.2 0.8 1.4 3.5-0.2 9.6-4.2-0.8 7.4 1.4 3.6 1.9 1.4v2.9l-3.1 3.6-4.3 13.7v3.1l2.5 4.6-4.6 0.8-1.5 3.2 0.3 2.6-5.7 2.7-0.1 2.8 1.2 4.3-0.8 1.4 4 2.9-3.5 0.8-1.6 1.9 1.1 1.2-2.5 2 0.3 4.7-2.2-0.5-1.5 4.3-6 1.2-1.8 2.2-2-0.9-3.6 3.6-6.3-0.8-2.8 2.4-8.4-2.3-1.4 1.8-5.1-1.2-3.2 4.1 3-13.7-3.4-3.4-0.4-2 1.1-1.3-4.7-3.1 1.4-2.6-2.2-0.8-0.1-1.7 0.6-1.9-1.2-0.3 3.4-4 0.3-5.3 3-1.3 0.7-2.8 2.7 0.2-0.2-1.4 2.3-1.3-0.2-1.9 1.6-0.4 0.8-1.9-3.4-4.7-2.5 3-9.8-1.7 0.7-9.2-4.1-1.8-7 1.3 2.7-2.6 2.2-5.4 0.9-6.7 3.2-1.1 3.3-5.2 4.5-0.3z"
        />
        <path
          className="individual-districts"
          id="Viseu"
          fillRule="evenodd"
          d="m193.1 107.8l3.5 1.7 2.8 5.3 4.4 0.9-3.4 10.5 0.6 3.6-3.5 0.1 0.1 2.4 4.5 2.2-0.9 4.2-3.2 2.4-0.5 4.9-2-1.1-4.2 7.4-5.1-6.4-4-0.3-2.2 2.2-3.5 7.9 4.8 3.6-2.2 2.3 0.5 1.7 4.8 2.6-1.4 1.5 0.8 1.9-2 1.6-2 6.6 0.7 1.4-7.1 1.5-13.8 6.8-4.8 2.8-7.5 7.5-5.8 2.2-7.8 5.8-3.1-1.3-1.2 1.2-0.7-1-4.9 2.2-4.1-3.9-2.5 0.4-1.2-1.7-1.1 0.3 0.1-4.6 3.2-3.6-1.6-4.9 7.3-2.8-3-3.1-1.9-6.4 5.3-2.2-4.2-2.1-0.2-6.5-2.4-2-0.6-3.2 5.1-1.9 3-7.6-1.5-3.4 2-1 3.4 2.1 2-2.3 3.2 2 2.2-2-2.1-3.5-0.4-5.6 3.7-4.4-0.2-2.4-0.6-0.5-2.9 3.9-5.2-2.2-1.6 0.5 0.8-1.8-2.6-0.2-0.5-1.5 0.8-0.3-0.5-3.3-2.3-1 5.1-3.1 5.8 1.1 3.4-1.9 3.6 1.3 8.5-3.7 3.4 0.3 3.2-4.1 5.1 1.2 1.4-1.8 8.4 2.3 2.8-2.4 6.3 0.7 3.6-3.6 2.1 1 1.7-2.2zm0.1 35.4l2.7 1.5 1.7-2.3-3.3-2.3z"
        />
        <path
          className="individual-districts"
          id="PT-20"
          d="m-1300.5 563.8l0.3 0.1 0.3 0.5 0.6 0.2 0.8-0.1v-0.6l0.2-0.1 0.9 0.6-0.2 0.9 0.3 0.5-0.4 0.6 0.1 0.5 0.3 0.2 0.4 0.2 0.6 0.3-0.1 0.3 1.1 0.6-0.3 0.2 0.1 0.5 0.7-0.1 0.2 0.6 0.3 0.2-0.2 0.7-0.1 0.5 0.5 0.8-0.4 0.7 0.3 0.5-0.3 0.1-0.1-0.2-0.5 0.1h-0.5-1.3l-0.9-0.2-1 0.2-1.1-1.1-0.1-0.5-0.7-0.6-0.9-0.2h-0.9l-0.8 0.7-0.4-0.2-1.1 0.8-0.6-0.7-0.4 0.4-0.4 0.3-0.9-0.6-0.4-0.6-0.1-1.9-1-1.7 0.4-1.3h0.6l0.3-0.7 0.5-0.2 0.6 0.1 1-0.8v0.6l0.8 0.5 0.6-0.6 1 0.4 0.6-0.3 0.1-0.7 0.5 0.3 0.4-0.4 0.3 0.2zm-29.6-85.9l0.3-0.2v-0.5h0.4l0.2 0.3-0.1 0.6 0.2 0.2 0.6-0.2 1.3-0.3 0.9-0.8 0.7 0.2 1.3-0.7 0.8-0.1 0.7-0.6 0.7-0.1 1.2-0.7 0.4-0.9 0.7-0.5 0.1 0.6 1.5 0.7h0.6l1.1-0.6 0.7 0.1 0.6-0.3 0.4 0.5 1.5 0.5h0.8l3.1-0.7 1.1 0.3 0.6-0.1 2.1 0.8 0.8 2.5 0.2 0.8 0.3 1.3-0.7 0.8-0.1 0.7 0.4 1.3-0.3 1.1-0.6 1.4-1 1.1-0.8 0.6h-1.7l-0.8 0.6-0.5 0.2-1-0.2-2.1-1h-2.1l-1.7 0.8-0.3 0.3-1.1 0.3-0.7 0.3-0.5 0.6-0.6-0.2-2.2 0.2-1.4 1.2-1.9-0.3-0.9 0.2-0.8-0.2-0.6 0.3-0.7-0.4-0.4 0.4-1 0.2-1.1-0.5h-0.6-0.7l-0.9-0.2-0.4 0.3-0.7 0.1-0.4 0.6-0.8 0.2-0.7-0.7-1-0.3-0.7-0.9-2.1-1.4-0.3-0.6-1.5 0.3-1-0.5-1 0.2-0.8-0.7h-1.2l-0.5 0.8-1 0.1-1.9 0.5-1.2 0.5-0.8-0.3-1.4-0.9-0.6-0.8-0.9-0.3-0.6-1-1.9-1.2-1.4-0.9-0.4-1-0.5-0.2-1-0.7-1.5-1-0.4-0.7-1.7-1.2-0.1-0.8-0.9-1.8-0.2-0.7 0.7-0.6 0.3-0.7 0.3-0.7h0.7l0.6-0.8-0.1-0.7 0.2-0.3 0.2-0.6 1.5 0.4 1.1-0.8 0.3-0.5 0.4-0.2 1.6 0.6 1 0.7 1.2 0.5 0.3 0.4 1.3 0.3 0.8 1.1 0.4 1.3 0.5 0.1 0.5 2.1 0.3 0.3 0.6-0.1 0.2 0.6 1.4 0.5h1.1l0.9 0.4 1-0.2 0.7 0.3 0.1-0.2 0.6 0.7 0.6 0.2 1.5 0.8 0.9-0.2 0.7-0.2 0.5 0.3 0.7-0.1 2.3-0.8 0.6-0.7 1.5-0.9 0.7-0.5 0.2-0.4 0.2-0.1 0.5 0.9 0.3 0.6 0.2 0.4 0.4 0.6 0.6-0.2 0.8 0.4 0.2-0.5h0.2l0.3 0.4 0.5 0.1zm-251.8-78.9l2.1 0.3 0.7 0.6 1.1 0.2 2.1 1.3 0.6 0.1 0.6 0.2 0.7 0.5-0.1 0.4 0.4 0.4h0.6l0.4 0.5 0.3 0.8 0.6 0.7 1.1-0.2 1 0.9 1.1 0.2 1.2-0.2 0.9 1.3 0.9 0.3 0.2 0.4h1l0.6 0.5 0.7 1.4h0.8l0.9 0.7h2.3l0.3 0.4 0.7 0.2 4.4 0.6 0.6-0.2 1.4 0.4 0.1 0.6 1.8 1 0.4 0.7 0.1 1.1-1.3 0.4h-0.8l-0.4 0.4-0.4-0.1-0.4 0.4-0.8-0.3-0.4 0.5h-1.1l-2-0.7-2.7-0.2-0.5 0.2-1.8-0.4-0.8 0.3-0.1 0.4-0.4 0.2-0.4 0.7-0.9 0.1-1.7 1-1 0.3-0.9-0.6-0.5-0.3v-0.8-0.7l-1.4-0.9-2.6 0.2-2.3-0.4-0.9 0.2-0.9-0.3-1.3 0.3-3-1.4-1-0.3-0.5 0.2-0.5 0.5-1.5 0.2-1.7-1.4-1.3-0.3-3.1-1.8-0.4-1.3-0.7-0.6-0.9-1.8-0.1-0.5 0.2-0.7-0.2-1.2 0.1-1 0.5-1.7h0.5l-0.1-0.3 0.7-0.2 0.1-0.6 1.2-0.8 0.1 0.1 2.4-1 2.4 0.6 0.5-0.4 0.9 0.2zm-25.3-8.9h0.8l2.7 1 0.8 0.4 0.2 0.4 1.2 1.1 2.2 0.6 1.9 1.8-0.5 0.5-0.4 1.1 0.4 1.1-0.7 0.8 0.8 1.6-0.2 0.3-1.2 0.1-0.5 0.6v1.1h0.2l0.1 0.3-0.2 0.2 0.4 0.4-0.3 0.4-0.3-0.4-0.2 0.1-0.3 0.1 0.1-0.4 0.5-0.2-0.2-0.4-0.3 0.3-0.7-0.2-0.9 0.4-1.8-0.1-0.7 0.3h-1.9l-0.9 0.3h-1.1l-1.4-0.7-0.9 0.2v-0.2h0.4l0.1-0.4-0.2-0.2-0.2-1.9-0.7-1.6-0.6-0.4-0.5 0.3-0.3-0.2-0.3 0.1-1.3-0.8-1.6-1-0.9-1.1-0.2 0.1v-0.7l-0.6-0.2 0.2-0.5h1.1l0.6-0.5 0.8-0.2h2.2l0.8-0.3 1.1 0.3 1-0.8 1.3-2zm33.6-12.2l2.4 0.5 2.2 0.7 2.5 1.6 0.4-0.1 4.4 1.9 2.7 0.8 0.8 0.8 0.7 0.2 0.5-0.1 0.3 0.6 2 0.4 1.3 0.9 1.6 0.5 0.7-0.6-0.1 0.5 0.5 0.5 1 0.2 0.8-0.2 1.6 1.3 1.2 0.3 1.2 1.5 1.1 0.1 0.3 0.6 1.5 0.6 0.7 0.6 0.5-0.2 1 1.3 1.2 0.2 1.5 0.6 4.3 2.4 0.8 0.4 0.5 0.3 1.5 0.6 0.3-0.1 0.3 0.6 1.4 0.5 2.1 1.9-0.4 0.2-0.3 0.4-1 0.7-0.7-0.2-4 0.4-2.7-1.3-0.7-0.8-0.7-0.3-1-0.7-1.8-0.7-2.8-2.2-1-0.1-1.3-0.7-1 0.3-2.3-0.8-0.5 0.2-0.8-0.2-0.8-0.5-1-1.2-1.6-1-3.3-0.6-0.8-0.6h-0.7v-0.4l-0.5-0.4-0.4 0.1-1.4-0.6-1.6-1.1-2-0.8-0.8-1.4-0.8 0.4-0.3-0.4-0.7 0.1-0.2-0.3 0.4-0.3 0.1-0.6-0.9-0.1 0.3-0.4-0.3-0.6-3.4-1.6-2.1-2-0.8-1.2-1-0.8zm89.5-5.1l0.6 0.3 0.4-0.1 0.4 0.5 0.7-0.2 0.7 0.6h0.8l-0.1-0.5 0.3-0.3 0.4 0.3 0.7-0.3 0.5 0.3 0.5 0.4 0.5-0.3 0.5 0.4 1.1 0.2 1.2 0.6 1.2-0.2 0.8 0.5 0.1 0.2 1.8-0.5 3.5 2.7 0.3 1.7 0.4 0.6 0.9 0.4-0.7 0.5-0.7 0.2-0.2 1.5 1 0.7 0.7 0.6-0.2 0.5 0.3 0.3-0.6 0.9-0.8 0.4 0.2 0.7-1 0.2-0.7 0.5 0.1 0.9-0.1 0.6-0.3 0.8 0.2 0.7-1.1 0.1-0.7-0.7-0.5 0.5-1.1-0.4-1.3 0.5-0.8-0.1-2.3-1.1-0.9 0.2-0.6-0.2-0.7 0.3-0.9-0.4-0.5 0.5-0.7-0.3-0.2 0.3 0.4 0.9-0.7 0.4-0.6-0.5 0.5-0.7-0.2-0.7h-1l-0.6-0.1-0.6 0.3h-1l-0.8 0.2-0.8-0.3-1.8-1.3-1.5-0.8-0.6-0.4-1.6-0.9-1.5-2.2-0.4-2-0.4-0.5v-1.8l0.6-1.4-0.5-0.8 0.6 0.2 0.4-0.8-0.1-0.3 0.4-0.6h0.4l2.1-1.4 3.8-0.8 1.5-0.1zm-65.3-31.8l1.4 0.4 0.7 0.7 0.4-0.3 0.5 0.3-0.3 0.2 0.8 0.5 0.9 1.6 0.2 0.7 0.4 0.1 0.1 0.4v0.5l1.1 1 0.4 1.3-0.1 0.3 0.4 0.4v0.4l-0.3 0.3 0.2 0.3h-0.7l-1 0.5-1.8-0.6-0.3 0.2-0.3-0.3-0.1-0.3-0.6-0.3-0.1-0.4-2.3 0.2-1-1.2-0.9-2.3-0.8-0.8v-0.5h-0.5l0.2-0.5 1.4-1.3-0.1-0.6 0.3-0.5 0.2-0.2 0.4-0.1 0.6 0.1 0.2-0.2zm-268.9-46.6l0.3 0.1-0.1 0.6 0.4 1.1 1.6 1.1 0.4-0.5 0.4 0.2-0.1 0.2 0.3 0.1 0.7-0.1 0.4-0.5 0.1 0.1 0.4 0.6-0.1 0.6 0.5 0.6-0.2 0.1 0.2 1.2 0.8 0.5 0.3 0.7 0.7-0.1 0.3 1.1-0.3 0.6-0.9 0.5-0.5 0.8-0.1 0.4 0.7 0.9-0.5-0.1-0.5 0.2-0.2 0.6 0.2 1.1-0.3 1-0.6 0.6-0.1 0.9-0.9 0.5 0.2 0.3-2 0.5-2.4-0.3-0.3 0.4-0.7 0.1-0.5-0.4h-0.8l-0.2-0.6-0.5-0.3 0.2-0.2-0.3-0.3-0.1-0.6 0.2-0.2-0.3-0.4 0.6-0.4 0.1-0.3-0.5-0.3 0.1-0.5-0.6-0.6-0.1-1.1 0.4-1-0.4-1.1-0.4-0.4 0.4-0.5-0.1-0.3h0.4l0.3-0.6v-2.7l0.7-0.7 0.1-0.4 0.5-0.2 0.7-1.2-0.3-1 2 0.1zm8.7-22.1l1.6 0.7 0.5 1.4v0.8l-0.4 1.4-1.3 1.3-0.6 0.2-0.2 0.4h-0.5l-0.4-0.1-0.1-0.5 0.6-0.5-0.2-0.6-0.6-0.9-0.2-1 0.8-1.8-0.2-0.7 0.5 0.1z"
        />
        <path
          className="individual-districts"
          id="PT-30"
          d="m-573.1 1032l0.9 2.6 1.3 2.2-1.4-0.7-0.4-0.8-0.8-2.2zm-1.6-7.9l1.3 2.8 0.2 2.6-2.1-5-1.8-1.5-0.2-3.1 1.5 1.8zm-55.5-33.8l1.3 2.1 2.1 2 1.6 0.1 1.1 1.1 3.5 0.7 3-0.7 2.2-1.5 2.2 0.4 5.1-1.1 1.7 1.1 1.7 1.9 2.3 2 1.2 2 2 0.5 1.7 0.5 2.8 0.2 1.5 0.4h1.6l0.8 0.3-0.4 1-2.2 0.1-1.4 0.3-0.8 1.5-0.7 0.3 0.2 0.9-1 1.7-1.6 0.6-0.9 2.2-2.4 2.2-1.5 0.4-2.5-0.9-2.3-0.1-0.9 0.5-2.5 0.9-0.7-0.9-2.6-1-2.6-0.1-5.9-2.7-1.5 0.2-2.9-2.6-6.3-3.3-2.8-3.7 0.2-0.8-0.7-2-1.2-1.3 5.6-5.4zm73-23l0.8-0.1-0.5 1.1 0.8 1.1-0.7 0.6 0.4 1-1.6-0.4-1.3 0.3-4.4 3.7-0.4-0.7-0.7-0.1-0.4-0.9h0.8l0.8-1.4 0.4-1.5-0.3-0.5 0.6-0.8h0.9l0.5-1 1.6-0.5 1.1-1z"
        />
      </svg>
    </>
  );
}
