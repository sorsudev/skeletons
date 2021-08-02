const AccordionItem = (props) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading${props.index}`}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${props.index}`} aria-expanded="true" aria-controls={`collapse${props.index}`}>
          {props.head}
        </button>
      </h2>
      <div id={`collapse${props.index}`} className="accordion-collapse collapse" aria-labelledby={`heading${props.index}`} data-bs-parent={`#${props.parentId}`}>
        <div className="accordion-body">
          {props.body}
        </div>
      </div>
    </div>
  );
}

export default AccordionItem;