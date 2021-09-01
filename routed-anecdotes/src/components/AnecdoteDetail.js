import { useParams } from 'react-router-dom';

const AnecdoteDetail = ({ anecdotes }) => {
  const { id } = useParams();

  const { content, votes, info } = anecdotes.find((a) => a.id === id);

  return (
    <div>
      <h2> {content} </h2>
      <p>Has {votes} votes</p>
      <p>
        For more info see{' '}
        <a target='_blank' rel='noreferrer' href={info}>
          {info}
        </a>
      </p>
    </div>
  );
};

export default AnecdoteDetail;
