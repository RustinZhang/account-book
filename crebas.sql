drop table if exists category;

drop table if exists transaction;

drop table if exists user;

create table category
(
   category_code        int not null auto_increment,
   category_name        varchar(6) not null,
   category_create_time datetime not null,
   category_update_time datetime,
   category_is_expense  bool not null,
   primary key (category_code)
)
auto_increment = 1;

create table transaction
(
   transaction_code     int not null auto_increment,
   category_code        int not null,
   user_id              int not null,
   transaction_amount   float(8,2) not null,
   transaction_remark   varchar(200),
   transaction_create_time datetime not null,
   transaction_update_time datetime,
   primary key (transaction_code)
)
auto_increment = 1;

create table user
(
   user_id              int not null auto_increment,
   user_name            varchar(8) not null,
   user_password        varchar(50) not null,
   user_update_time     datetime,
   user_create_time     datetime not null,
   primary key (user_id)
)
auto_increment = 1;

alter table transaction add constraint FK_category_transaction_relationship foreign key (category_code)
      references category (category_code) on delete restrict on update restrict;

alter table transaction add constraint FK_transaction_user_relationship foreign key (user_id)
      references user (user_id) on delete restrict on update restrict;

