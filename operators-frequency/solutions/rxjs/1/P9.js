const { from, interval } = rxjs;
const { mergeMap } = rxjs.operators;

const axiosConfig = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
};

const getUsers$ = from(axios.get('/users', axiosConfig).then(response => response.data));

const fetchUser$ = user =>
  from(axios.get(`/users/${user.id}`, axiosConfig).then(response => response.data));

const allUsers$ = getUsers$.pipe(
  mergeMap(users$ =>
    interval(3000).pipe(
      mergeMap(() => from(users$)),
      mergeMap(fetchUser$)
    )
  )
);

allUsers$.subscribe(user => console.log(user));
