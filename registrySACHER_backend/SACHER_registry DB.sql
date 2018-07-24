--
-- PostgreSQL database dump
--

CREATE TABLE public.role_names (
    role integer NOT NULL,
    role_name text NOT NULL
);


CREATE TABLE public.role_services (
    role integer NOT NULL,
    services text[]
);


CREATE TABLE public.user_table (
    username text NOT NULL,
    password text NOT NULL,
    email text,
    role integer NOT NULL,
    creation_time timestamp without time zone DEFAULT now() NOT NULL
);


CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);



COPY public.role_names (role, role_name) FROM stdin;
0	super_admin
1	admin
2	administrative_manager
3	project_manager
4	operator
5	admin_autocad
6	operator_autocad 
7	admin_data 
8	operator_data
\.


--
-- Data for Name: role_services; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_services (role, services) FROM stdin;
1	{user,storage}
0	{domain,user,server,container_webproject,container_dataprocessing}
\.


--
-- Data for Name: user_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_table (username, password, email, role, creation_time) FROM stdin;
user8	$2b$12$Dr.ex71uDuY06bvbuuE35OfxpA44CCRkn4rCYFSye.lbnBo7JLqaS	email8	8	2018-05-30 14:26:36.879427
\.


