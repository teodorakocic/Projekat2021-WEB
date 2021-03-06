﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Projekat2021_WEB.Models;

namespace Projekat2021_WEB.Migrations
{
    [DbContext(typeof(RestoranContext))]
    [Migration("20210112000623_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("Projekat2021_WEB.Models.Porudzbina", b =>
                {
                    b.Property<int>("RedniBroj")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("RedniBroj")
                        .UseIdentityColumn();

                    b.Property<int>("BrojStavki")
                        .HasColumnType("int")
                        .HasColumnName("BrojStavki");

                    b.Property<int>("Cena")
                        .HasColumnType("int")
                        .HasColumnName("Cena");

                    b.Property<int?>("RestoranID")
                        .HasColumnType("int");

                    b.Property<int>("VremeSpremanja")
                        .HasColumnType("int")
                        .HasColumnName("VremeSpremanja");

                    b.HasKey("RedniBroj");

                    b.HasIndex("RestoranID");

                    b.ToTable("Porudzbina");
                });

            modelBuilder.Entity("Projekat2021_WEB.Models.Restoran", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("I")
                        .HasColumnType("int")
                        .HasColumnName("I");

                    b.Property<int>("J")
                        .HasColumnType("int")
                        .HasColumnName("J");

                    b.Property<string>("Naziv")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Naziv");

                    b.HasKey("ID");

                    b.ToTable("Restoran");
                });

            modelBuilder.Entity("Projekat2021_WEB.Models.Sto", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ID")
                        .UseIdentityColumn();

                    b.Property<int>("MaxKapacitet")
                        .HasColumnType("int")
                        .HasColumnName("MaxKapacitet");

                    b.Property<int?>("RestoranID")
                        .HasColumnType("int");

                    b.Property<int>("X")
                        .HasColumnType("int")
                        .HasColumnName("X");

                    b.Property<int>("Y")
                        .HasColumnType("int")
                        .HasColumnName("Y");

                    b.HasKey("ID");

                    b.HasIndex("RestoranID");

                    b.ToTable("Sto");
                });

            modelBuilder.Entity("Projekat2021_WEB.Models.Porudzbina", b =>
                {
                    b.HasOne("Projekat2021_WEB.Models.Restoran", "Restoran")
                        .WithMany("Porudzbine")
                        .HasForeignKey("RestoranID");

                    b.Navigation("Restoran");
                });

            modelBuilder.Entity("Projekat2021_WEB.Models.Sto", b =>
                {
                    b.HasOne("Projekat2021_WEB.Models.Restoran", "Restoran")
                        .WithMany("Stolovi")
                        .HasForeignKey("RestoranID");

                    b.Navigation("Restoran");
                });

            modelBuilder.Entity("Projekat2021_WEB.Models.Restoran", b =>
                {
                    b.Navigation("Porudzbine");

                    b.Navigation("Stolovi");
                });
#pragma warning restore 612, 618
        }
    }
}
