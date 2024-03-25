import React from 'react';

const PageNav = ({
    count,
    currPage,
    setter,
}) => {
    let loopable = new Array(count);
    loopable.fill(0);
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {(count <= 5) ? (
                    <>
                        {loopable.map((el, index) => {
                            return (
                                <li className="page-item" key={index}><button
                                    className={`page-link ${index == currPage ? 'active' : ''}`}
                                    onClick={() => setter({ page: index })}
                                >{index + 1}</button></li>
                            );
                        })}
                    </>
                ) : (
                    <>
                        {(currPage > 0) ? (<li className="page-item"><button className="page-link" onClick={() => { setter({ page: 0 }); }}>First</button></li>) : (<></>)}
                        {(currPage > 1) ? (<li className="page-item"><button className="page-link" onClick={() => { setter({ page: currPage > 1 ? currPage - 1 : 0 }); }}>&lt;</button></li>) : (<></>)}
                        <li className="page-item"><button className="page-link active">{currPage + 1}</button></li>
                        {(currPage < count - 2) ? (<li className="page-item"><button className="page-link" onClick={() => { setter({ page: currPage < count - 1 ? currPage + 1 : count - 1 }); }}>&gt;</button></li>) : (<></>)}
                        {(currPage < count - 1) ? (<li className="page-item"><button className="page-link" onClick={() => { setter({ page: count - 1 }); }}>Last</button></li>) : (<></>)}

                    </>
                )}
            </ul>
        </nav >
    );
};

export default PageNav;