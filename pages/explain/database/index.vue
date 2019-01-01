<template>
  <v-layout>
    <v-flex
      xs12>
      <v-container>
        <v-layout>
          <v-flex
            xs12>
            <v-card>
              <v-card-title
                primary-title
                class="display-2 justify-center hidden-sm-and-down">
                Entity Relationship Diagram
              </v-card-title>
              <v-card-title
                primary-title
                class="headline justify-center hidden-sm">
                Entity Relationship Diagram
              </v-card-title>
              <v-layout
                row
                wrap>
                <v-flex
                  xs12
                  order-xs2
                  md6
                  order-md1>
                  <v-card-text>
                    <v-tabs
                      centered>
                      <v-tab>
                        Summary
                      </v-tab>
                      <v-tab>
                        pg_dump
                      </v-tab>
                      <v-tab>
                        knex
                      </v-tab>
                      <v-tab-item>
                        <pre
                          class="pre-wrap">
                          {{ summary }}
                        </pre>
                      </v-tab-item>
                      <v-tab-item>
                        <pre
                          class="pre-wrap">
                          {{ pg_dump }}
                        </pre>
                      </v-tab-item>
                      <v-tab-item>
                        <pre
                          class="pre-wrap">
                          {{ knex }}
                        </pre>
                      </v-tab-item>
                    </v-tabs>
                  </v-card-text>
                </v-flex>
                <v-flex
                  xs12
                  order-xs1
                  md6
                  order-md2>
                  <v-img
                    :src="erdpng"
                    class="cursor-pointer"
                    @click="dialog = true"/>
                  <v-dialog
                    v-model="dialog"
                    @keydown.esc="dialog = false">
                    <v-img
                      :src="erdpng" />
                  </v-dialog>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    async asyncData() {
      return {
        dialog: false,
        erdpng: require("~/assets/nextseville.png"),
        summary: `
1. Role table includes user and admin.

2. Member table includes first name, last name, gender, birthdate, address, role_id (which references role in #1), avatar (profile picture), and deactivated (determines if user is allowed to login.

3. Category table includes any number of category names.

4. Size table includes sizes for xs, sm, md, lg, and xl.

5. Item table includes sku, category_id (see #3), img, price, discount, and size_id (see #4).

6. Rating table includes member_id (see #2), item_id (see #5), stars (1-5), and comment. member_id and item_id must be unique, meaning that a member can only rate an item once.

7. Status table includes the order status (pending, approved, shipped, delivered).

8. Ship Method table includes Economy and VIP.

9. Pay Method table includes COD and PayPal.

10. Order table includes the member_id (see #2), order_at (time of purchase), ship_to (address), status_id (see #7), ship_method (see #8), pay_method (see #9), and paypal_payment_sid (to track paypal payments).

11. Order Detail table includes order_id (see #10), item_id (see #5), and quantity.

12. Cart table includes member_id (see #2) and order_id (see #10, which must be unique, meaning that an order is assigned to one cart only).

13. Cart Item table is similar to Order Detail table.

14. News table includes the news articles.

15. Event table includes the list of events.
        `,
        pg_dump: `
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.6 (Ubuntu 10.6-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    member_id integer NOT NULL,
    order_id integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cart OWNER TO aes;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_id_seq OWNER TO aes;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: cart_item; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.cart_item (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    item_id integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT cart_item_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.cart_item OWNER TO aes;

--
-- Name: cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_item_id_seq OWNER TO aes;

--
-- Name: cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.cart_item_id_seq OWNED BY public.cart_item.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO aes;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO aes;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: event; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.event (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.event OWNER TO aes;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO aes;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.events OWNER TO aes;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_id_seq OWNER TO aes;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.item (
    id integer NOT NULL,
    sku text NOT NULL,
    name text NOT NULL,
    category_id integer NOT NULL,
    description text NOT NULL,
    img text,
    price numeric(15,6) NOT NULL,
    discount numeric(15,6) DEFAULT '0'::numeric,
    size_id integer
);


ALTER TABLE public.item OWNER TO aes;

--
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_id_seq OWNER TO aes;

--
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO aes;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO aes;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO aes;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO aes;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: member; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.member (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    gender text,
    email text NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    birthdate date,
    address text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role_id integer NOT NULL,
    avatar text,
    deactivated boolean DEFAULT false NOT NULL,
    CONSTRAINT member_gender_check CHECK ((gender = ANY (ARRAY['m'::text, 'f'::text])))
);


ALTER TABLE public.member OWNER TO aes;

--
-- Name: member_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.member_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_id_seq OWNER TO aes;

--
-- Name: member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.member_id_seq OWNED BY public.member.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title text NOT NULL
);


ALTER TABLE public.news OWNER TO aes;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO aes;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    member_id integer NOT NULL,
    order_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ship_to text NOT NULL,
    status_id integer DEFAULT 1 NOT NULL,
    ship_at timestamp with time zone,
    deliver_at timestamp with time zone,
    ship_method_id integer,
    pay_method_id integer,
    paypal_payment_sid text
);


ALTER TABLE public."order" OWNER TO aes;

--
-- Name: order_detail; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.order_detail (
    id integer NOT NULL,
    order_id integer NOT NULL,
    item_id integer NOT NULL,
    quantity integer NOT NULL,
    price numeric(15,6) NOT NULL,
    discount numeric(15,6) DEFAULT '0'::numeric,
    CONSTRAINT order_detail_quantity_check CHECK ((quantity > 0))
);


ALTER TABLE public.order_detail OWNER TO aes;

--
-- Name: order_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.order_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_detail_id_seq OWNER TO aes;

--
-- Name: order_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.order_detail_id_seq OWNED BY public.order_detail.id;


--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO aes;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: pay_method; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.pay_method (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.pay_method OWNER TO aes;

--
-- Name: pay_method_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.pay_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pay_method_id_seq OWNER TO aes;

--
-- Name: pay_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.pay_method_id_seq OWNED BY public.pay_method.id;


--
-- Name: rating; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.rating (
    id integer NOT NULL,
    member_id integer NOT NULL,
    item_id integer NOT NULL,
    stars integer NOT NULL,
    comment text,
    CONSTRAINT rating_stars_check CHECK (((stars >= 1) AND (stars <= 5)))
);


ALTER TABLE public.rating OWNER TO aes;

--
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.rating_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rating_id_seq OWNER TO aes;

--
-- Name: rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.rating_id_seq OWNED BY public.rating.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.role OWNER TO aes;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO aes;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: ship_method; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.ship_method (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.ship_method OWNER TO aes;

--
-- Name: ship_method_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.ship_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ship_method_id_seq OWNER TO aes;

--
-- Name: ship_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.ship_method_id_seq OWNED BY public.ship_method.id;


--
-- Name: size; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.size (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.size OWNER TO aes;

--
-- Name: size_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.size_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.size_id_seq OWNER TO aes;

--
-- Name: size_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.size_id_seq OWNED BY public.size.id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: aes
--

CREATE TABLE public.status (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.status OWNER TO aes;

--
-- Name: status_id_seq; Type: SEQUENCE; Schema: public; Owner: aes
--

CREATE SEQUENCE public.status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_id_seq OWNER TO aes;

--
-- Name: status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: aes
--

ALTER SEQUENCE public.status_id_seq OWNED BY public.status.id;


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: cart_item id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart_item ALTER COLUMN id SET DEFAULT nextval('public.cart_item_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: event id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: item id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: member id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.member_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: order_detail id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.order_detail ALTER COLUMN id SET DEFAULT nextval('public.order_detail_id_seq'::regclass);


--
-- Name: pay_method id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.pay_method ALTER COLUMN id SET DEFAULT nextval('public.pay_method_id_seq'::regclass);


--
-- Name: rating id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.rating ALTER COLUMN id SET DEFAULT nextval('public.rating_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: ship_method id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.ship_method ALTER COLUMN id SET DEFAULT nextval('public.ship_method_id_seq'::regclass);


--
-- Name: size id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.size ALTER COLUMN id SET DEFAULT nextval('public.size_id_seq'::regclass);


--
-- Name: status id; Type: DEFAULT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.status ALTER COLUMN id SET DEFAULT nextval('public.status_id_seq'::regclass);


--
-- Name: cart_item cart_item_cart_id_item_id_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_cart_id_item_id_unique UNIQUE (cart_id, item_id);


--
-- Name: cart_item cart_item_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_pkey PRIMARY KEY (id);


--
-- Name: cart cart_order_id_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_order_id_unique UNIQUE (order_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);


--
-- Name: item item_sku_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_sku_unique UNIQUE (sku);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: member member_email_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_email_unique UNIQUE (email);


--
-- Name: member member_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);


--
-- Name: member member_username_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_username_unique UNIQUE (username);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: order_detail order_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_pkey PRIMARY KEY (id);


--
-- Name: order order_paypal_payment_sid_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_paypal_payment_sid_unique UNIQUE (paypal_payment_sid);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: pay_method pay_method_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.pay_method
    ADD CONSTRAINT pay_method_pkey PRIMARY KEY (id);


--
-- Name: rating rating_member_id_item_id_unique; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_member_id_item_id_unique UNIQUE (member_id, item_id);


--
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: ship_method ship_method_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.ship_method
    ADD CONSTRAINT ship_method_pkey PRIMARY KEY (id);


--
-- Name: size size_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.size
    ADD CONSTRAINT size_pkey PRIMARY KEY (id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (id);


--
-- Name: cart_item cart_item_cart_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_cart_id_foreign FOREIGN KEY (cart_id) REFERENCES public.cart(id);


--
-- Name: cart_item cart_item_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart_item
    ADD CONSTRAINT cart_item_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.item(id);


--
-- Name: cart cart_member_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_member_id_foreign FOREIGN KEY (member_id) REFERENCES public.member(id);


--
-- Name: cart cart_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: item item_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: item item_size_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_size_id_foreign FOREIGN KEY (size_id) REFERENCES public.size(id);


--
-- Name: member member_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: order_detail order_detail_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.item(id);


--
-- Name: order_detail order_detail_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: order order_member_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_member_id_foreign FOREIGN KEY (member_id) REFERENCES public.member(id);


--
-- Name: order order_pay_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pay_method_id_foreign FOREIGN KEY (pay_method_id) REFERENCES public.pay_method(id);


--
-- Name: order order_ship_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_ship_method_id_foreign FOREIGN KEY (ship_method_id) REFERENCES public.ship_method(id);


--
-- Name: order order_status_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_status_id_foreign FOREIGN KEY (status_id) REFERENCES public.status(id);


--
-- Name: rating rating_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.item(id);


--
-- Name: rating rating_member_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: aes
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_member_id_foreign FOREIGN KEY (member_id) REFERENCES public.member(id);


--
-- PostgreSQL database dump complete
--
          `,
        knex: `
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("role", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("member", table => {
      table.increments()
      table.text("firstName").notNullable()
      table.text("lastName").notNullable()
      table.enu("gender", ["m", "f"])
      table.text("email").notNullable().unique()
      table.text("username").notNullable().unique()
      table.text("password").notNullable()
      table.date("birthdate")
      table.text("address")
      table.timestamp("created_at").notNullable()
        .defaultTo(knex.fn.now())
      table.integer("role_id").notNullable()
      table.foreign("role_id").references("id").inTable("role")
      table.text("avatar")
      table.boolean("deactivated").notNullable()
        .defaultTo(false)
    })

    .createTable("category", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("size", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("item", table => {
      table.increments()
      table.text("sku").notNullable().unique()
      table.text("name").notNullable()
      table.integer("category_id").notNullable()
      table.foreign("category_id").references("id").inTable("category")
      table.text("description").notNullable()
      table.text("img")
      table.decimal("price", 15, 6).notNullable()
      table.decimal("discount", 15, 6).defaultTo(0)
      table.integer("size_id")
      table.foreign("size_id").references("id").inTable("size")
    })
    
    .createTable("rating", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.unique(["member_id", "item_id"])
      table.integer("stars").notNullable().unsigned()
      table.text("comment")
    })

    .createTable("status", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("ship_method", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("pay_method", table => {
      table.increments()
      table.text("name").notNullable()
    })

    .createTable("order", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.timestamp("order_at").notNullable().defaultTo(knex.fn.now())
      table.text("ship_to").notNullable()
      table.integer("status_id").notNullable().defaultTo(1)
      table.foreign("status_id").references("id").inTable("status")
      table.timestamp("ship_at")
      table.timestamp("deliver_at")
      table.integer("ship_method_id")
      table.foreign("ship_method_id").references("id").inTable("ship_method")
      table.integer("pay_method_id")
      table.foreign("pay_method_id").references("id").inTable("pay_method")
      table.text("paypal_payment_sid").unique()
    })

    .createTable("order_detail", table => {
      table.increments()
      table.integer("order_id").notNullable()
      table.foreign("order_id").references("id").inTable("order")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.integer("quantity").notNullable()
      table.decimal("price", 15, 6).notNullable()
      table.decimal("discount", 15, 6).defaultTo(0)
    })

    .createTable("cart", table => {
      table.increments()
      table.integer("member_id").notNullable()
      table.foreign("member_id").references("id").inTable("member")
      table.integer("order_id").unique()
      table.foreign("order_id").references("id").inTable("order")
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
    })
    
    .createTable("cart_item", table => {
      table.increments()
      table.integer("cart_id").notNullable()
      table.foreign("cart_id").references("id").inTable("cart")
      table.integer("item_id").notNullable()
      table.foreign("item_id").references("id").inTable("item")
      table.unique(["cart_id", "item_id"])
      table.integer("quantity").notNullable()
    })

    .createTable("news", table => {
      table.increments()
      table.text("title").notNullable()
    })

    .createTable("event", table => {
      table.increments()
      table.text("title").notNullable()
    })

    /*
    .createTable("", table => {
      table.increments()
    })
    */
    .then(() => {
      knex.raw("alter table rating add check (stars between 1 and 5)").then(() => {})
      knex.raw("alter table order_detail add check (quantity > 0)").then(() => {})
      knex.raw("alter table cart_item add check (quantity > 0)").then(() => {})
    })
    .catch(e => {
      console.log(e)
      return dropTables(knex, Promise)
    })
};

exports.down = function(knex, Promise) {
  return dropTables(knex, Promise)
};

const dropTables = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists("event")
    .dropTableIfExists("news")
    .dropTableIfExists("cart_item")
    .dropTableIfExists("cart")
    .dropTableIfExists("order_detail")
    .dropTableIfExists("order")
    .dropTableIfExists("pay_method")
    .dropTableIfExists("ship_method")
    .dropTableIfExists("status")
    .dropTableIfExists("rating")
    .dropTableIfExists("item")
    .dropTableIfExists("size")
    .dropTableIfExists("category")
    .dropTableIfExists("member")
    .dropTableIfExists("role")
}

exports.config = { transaction: false }
        `,
      }
    },
  }
</script>

<style
  scoped>
  .cursor-pointer {
    cursor: pointer;
  }
  .pre-wrap {
    white-space: pre-wrap;
  }
</style>
