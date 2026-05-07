/**
 * Content의 타이틀 관련 컴포넌트 모음
 */
export function Description({ description }) {
    return(
        <p className="description">{description}</p>
    )
}

export function TitleDescription({ titleDescription }) {
    return(
        <p>{titleDescription}</p>
    )
}

export function SubTitle({ subTitle }) {
    return(
        <p className="description">{subTitle}</p>
    )
}

export function Title({ title }) {
    return(
        <h2 className="title">{title}</h2>
    )
}